import React, { useRef, useState, useEffect } from 'react';
import "../styles/FlashcardInput.css";
import TextFormattingToolbar from './TextFormattingToolbar';

export default function FlashcardInput({ addFlashcard, disabled, type }) {
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const frontSelectionRange = useRef(null);
  const backSelectionRange = useRef(null);
  const [activeEditor, setActiveEditor] = useState(null);

  // Track selection changes for front editor
  const handleFrontSelection = () => {
    setActiveEditor(frontRef);
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      frontSelectionRange.current = selection.getRangeAt(0);
    }
  };

  // Track selection changes for back editor
  const handleBackSelection = () => {
    setActiveEditor(backRef);
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      backSelectionRange.current = selection.getRangeAt(0);
    }
  };

  // Handle Cloze button click
  const handleCloze = () => {
    if (!frontRef.current) return;
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) {
      console.warn("No text selected for cloze deletion");
      return;
    }

    const span = document.createElement('span');
    span.textContent = `{{c1::${selectedText}}}`;
    range.deleteContents();
    range.insertNode(span);

    // Move cursor after the cloze
    const newRange = document.createRange();
    newRange.setStartAfter(span);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
    frontRef.current.focus();
  };

  // Add flashcard with current content
  const handleAdd = () => {
    const front = frontRef.current?.innerHTML || '';
    const back = backRef.current?.innerHTML || '';

    if (type === 'Cloze') {
      if (!front.trim()) return;
      addFlashcard(front, back.trim() || front);
    } else {
      if (!front.trim() || !back.trim()) return;
      addFlashcard(front, back);
    }

    // Clear content
    if (frontRef.current) frontRef.current.innerHTML = '';
    if (backRef.current) backRef.current.innerHTML = '';
  };

  return (
    <div className="flashcard-input">
      <h4>Front Side {type === 'Cloze' && <span>(Required)</span>}</h4>
      
      {!disabled && (
        <TextFormattingToolbar 
          editorRef={frontRef}
          selectionRangeRef={frontSelectionRange}
        />
      )}
      
      <div className="flashcard-box">
        <div
          ref={frontRef}
          className="flashcard-box-content"
          contentEditable={!disabled}
          onFocus={handleFrontSelection}
          onMouseUp={handleFrontSelection}
          onKeyUp={handleFrontSelection}
          placeholder={type === 'Cloze' 
            ? "Enter text with content to be hidden..." 
            : "Enter front side..."}
        />
      </div>

      <h4>Back Side {type === 'Cloze' && <span>(Optional)</span>}</h4>
      
      {!disabled && (
        <TextFormattingToolbar 
          editorRef={backRef}
          selectionRangeRef={backSelectionRange}
        />
      )}
      
      <div className="flashcard-box">
        <div
          ref={backRef}
          className="flashcard-box-content"
          contentEditable={!disabled}
          onFocus={handleBackSelection}
          onMouseUp={handleBackSelection}
          onKeyUp={handleBackSelection}
          placeholder={type === 'Cloze' 
            ? "Enter additional info (optional)..." 
            : "Enter back side..."}
        />
      </div>

      {type === 'Cloze' && (
        <div style={{ marginBottom: '10px' }}>
          <button onClick={handleCloze} disabled={disabled}>
            [c] Cloze
          </button>
          <small style={{ marginLeft: '10px', color: '#666' }}>
            Select text and click [c] to cloze
          </small>
        </div>
      )}

      <button 
        className="add-flashcard-btn" 
        onClick={handleAdd} 
        disabled={disabled || (type !== 'Cloze' && (!frontRef.current?.innerHTML?.trim() || !backRef.current?.innerHTML?.trim())) || (type === 'Cloze' && !frontRef.current?.innerHTML?.trim())}
      >
        Add Flashcard
      </button>
    </div>
  );
}