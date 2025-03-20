import React, { useState, useRef, useEffect } from 'react';
import "../styles/FlashcardInput.css";
import TextFormattingToolbar from './TextFormattingToolbar';

export default function FlashcardInput({ addFlashcard, disabled, type }) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  // Refs to read cursor & selection in each textarea
  const frontRef = useRef(null);
  const backRef = useRef(null);

  // Insert the actual flashcard
  const handleAdd = () => {
    // For cloze type, we only require the front to be filled
    if (type === 'Cloze') {
      if (!front.trim()) {
        console.error("Cannot add cloze flashcard. Front is empty.");
        return;
      }
      // Use back if provided, otherwise use front content for both
      const backContent = back.trim() ? back : front;
      addFlashcard(front, backContent);
      setFront('');
      setBack('');
    } else {
      // For basic cards, we need both front and back
      if (!front.trim() || !back.trim()) {
        console.error("Cannot add basic flashcard. Front or back is empty.");
        return;
      }
      addFlashcard(front, back);
      setFront('');
      setBack('');
    }
  };

  // Auto-resize the textarea to fit content
  const autoResizeTextarea = (textarea) => {
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // For each text change
  const handleFrontChange = (e) => {
    setFront(e.target.value);
    autoResizeTextarea(e.target);
  };
  
  const handleBackChange = (e) => {
    setBack(e.target.value);
    autoResizeTextarea(e.target);
  };

  // Handle formatting updates from toolbar
  const handleFormatFront = (newText) => {
    setFront(newText);
    // We need to resize after setting new content
    setTimeout(() => autoResizeTextarea(frontRef.current), 0);
  };
  
  const handleFormatBack = (newText) => {
    setBack(newText);
    // We need to resize after setting new content
    setTimeout(() => autoResizeTextarea(backRef.current), 0);
  };

  // CLOZE button logic: replace user's highlighted text with "{{c1::selectedText}}"
  const handleCloze = () => {
    if (!frontRef.current) return;
    const textarea = frontRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end) {
      // no text selected
      console.warn("No text selected for cloze deletion");
      return;
    }
    // Get the selected text
    const selectedText = front.slice(start, end);
    // Build new string with cloze syntax (similar to Anki)
    const before = front.slice(0, start);
    const after = front.slice(end);
    const newValue = before + `{{c1::${selectedText}}}` + after;
    setFront(newValue);

    // Reposition the cursor after the inserted cloze
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + 6 + selectedText.length + 2;
      textarea.selectionStart = newPosition;
      textarea.selectionEnd = newPosition;
      autoResizeTextarea(textarea);
    }, 0);
  };

  return (
    <div className="flashcard-input">
      <h4>Front Side {type === 'Cloze' && <span>(Required)</span>}</h4>
      
      {/* Front side formatting toolbar */}
      {!disabled && (
        <TextFormattingToolbar 
          textareaRef={frontRef} 
          onFormatText={handleFormatFront}
        />
      )}
      
      <div className="flashcard-box">
        <textarea
          ref={frontRef}
          placeholder={type === 'Cloze' 
            ? "Enter text with content to be hidden..." 
            : "Enter front side..."}
          disabled={disabled}
          value={front}
          onChange={handleFrontChange}
          style={{ overflow: 'hidden', resize: 'none', color: 'black' }}
        />
      </div>

      {/* Show back side for all cards, but mark it as optional for Cloze */}
      <h4>Back Side {type === 'Cloze' && <span style={{ fontWeight: 'normal', fontSize: '0.8em' }}>(Optional for Cloze)</span>}</h4>
      
      {/* Back side formatting toolbar */}
      {!disabled && (
        <TextFormattingToolbar 
          textareaRef={backRef} 
          onFormatText={handleFormatBack}
        />
      )}
      
      <div className="flashcard-box">
        <textarea
          ref={backRef}
          placeholder={type === 'Cloze' 
            ? "Enter additional info (optional)..." 
            : "Enter back side..."}
          disabled={disabled}
          value={back}
          onChange={handleBackChange}
          style={{ overflow: 'hidden', resize: 'none', color: 'black' }}
        />
      </div>

      {/* Show the cloze button only if deck type === 'Cloze' */}
      {type === 'Cloze' && (
        <div style={{ marginBottom: '10px' }}>
          <button onClick={handleCloze} disabled={disabled}>
            [c] Cloze
          </button>
          <small style={{ marginLeft: '10px', color: '#666' }}>
            Select text and click [c] to make content hidden
          </small>
        </div>
      )}

      <button 
        className="add-flashcard-btn" 
        onClick={handleAdd} 
        disabled={disabled || (type !== 'Cloze' && (!front.trim() || !back.trim())) || (type === 'Cloze' && !front.trim())}
      >
        Add Flashcard
      </button>

      {disabled && (
        <p style={{ color: "red" }}>Please enter a Deck Name first</p>
      )}
    </div>
  );
}