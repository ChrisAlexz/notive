import React, { useRef, useEffect, useState } from 'react';
import '../styles/FlashcardList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import TextFormattingToolbar from './TextFormattingToolbar';

const FlashcardItem = ({ index, front, back, updateFlashcard, onDelete }) => {
  const frontRef = useRef(null);
  const backRef = useRef(null);

  // Ref to store the current selection range
  const selectionRangeRef = useRef(null);
  // State to keep track of the active editor ref (front or back)
  const [activeEditorRef, setActiveEditorRef] = useState(null);
  
  // Keep track of active formatting states
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    superscript: false,
    subscript: false
  });

  // When editing finishes, update the flashcard content
  const handleContentChange = (side) => {
    if (side === 'front' && frontRef.current) {
      updateFlashcard(index, { front: frontRef.current.innerHTML });
    } else if (side === 'back' && backRef.current) {
      updateFlashcard(index, { back: backRef.current.innerHTML });
    }
  };

  // Save the current selection and mark the active editor
  const handleSelectionChange = (editorRef) => {
    setActiveEditorRef(editorRef);
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      selectionRangeRef.current = selection.getRangeAt(0);
      checkActiveFormats(selection);
    }
  };

  // Check which formats are currently active in the selection
  const checkActiveFormats = (selection) => {
    if (!selection || !selection.rangeCount) return;
    
    // Get the common ancestor of the selection
    const parentElement = selection.getRangeAt(0).commonAncestorContainer;
    
    // Find the closest element if the node is a text node
    const element = parentElement.nodeType === 3 ? parentElement.parentNode : parentElement;
    
    // Check which formats are active
    setActiveFormats({
      bold: isFormatActive(element, 'bold') || document.queryCommandState('bold'),
      italic: isFormatActive(element, 'italic') || document.queryCommandState('italic'),
      underline: isFormatActive(element, 'underline') || document.queryCommandState('underline'),
      superscript: isFormatActive(element, 'superscript') || document.queryCommandState('superscript'),
      subscript: isFormatActive(element, 'subscript') || document.queryCommandState('subscript')
    });
  };

  // Check if a format is active in the element or its parents
  const isFormatActive = (element, format) => {
    if (!element || element.nodeType !== 1) return false;
    
    // Map format names to CSS properties or element types
    const formatMap = {
      bold: ['fontWeight', 'bold', 'STRONG', 'B'],
      italic: ['fontStyle', 'italic', 'EM', 'I'],
      underline: ['textDecoration', 'underline', 'U'],
      superscript: ['verticalAlign', 'super', 'SUP'],
      subscript: ['verticalAlign', 'sub', 'SUB']
    };
    
    // Check if element is of type or has style
    const tagName = element.tagName;
    if (formatMap[format].includes(tagName)) return true;
    
    // Check computed style
    const computedStyle = window.getComputedStyle(element);
    const styleProp = formatMap[format][0];
    const styleValue = formatMap[format][1];
    
    if (computedStyle[styleProp] === styleValue) return true;
    if (styleProp === 'textDecoration' && computedStyle[styleProp].includes(styleValue)) return true;
    
    // Check parent recursively
    return element.parentElement ? isFormatActive(element.parentElement, format) : false;
  };

  // Update active formats when selection changes
  useEffect(() => {
    const handleDocumentSelectionChange = () => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const container = selection.getRangeAt(0).commonAncestorContainer;
        if (frontRef.current && frontRef.current.contains(container)) {
          handleSelectionChange(frontRef);
        } else if (backRef.current && backRef.current.contains(container)) {
          handleSelectionChange(backRef);
        }
      }
    };

    document.addEventListener('selectionchange', handleDocumentSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleDocumentSelectionChange);
    };
  }, []);

  // Set initial content once the component mounts
  useEffect(() => {
    if (frontRef.current && typeof front === 'string') {
      frontRef.current.innerHTML = front;
    }
    if (backRef.current && typeof back === 'string') {
      backRef.current.innerHTML = back;
    }
  }, [front, back]);

  // Handle format change from toolbar
  const handleFormatChange = (formats) => {
    setActiveFormats(formats);
  };

  return (
    <div className="flashcard-item">
      <div className="flashcard-top-row">
        <div className="index-num">{index + 1}</div>
        <button className="delete-btn" onClick={() => onDelete(index)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      {/* Render a single toolbar and pass the active editor and selection range */}
      <TextFormattingToolbar 
        editorRef={activeEditorRef} 
        selectionRangeRef={selectionRangeRef}
        activeFormats={activeFormats}
        onFormatChange={handleFormatChange}
      />

      <div className="front-back">
        <div className="front">
          <label>Front</label>
          <div
            className="editable-content text-front"
            ref={frontRef}
            contentEditable
            onFocus={() => handleSelectionChange(frontRef)}
            onMouseUp={() => handleSelectionChange(frontRef)}
            onKeyUp={() => handleSelectionChange(frontRef)}
            onBlur={() => handleContentChange('front')}
            style={{
              minHeight: '100px',
              overflow: 'auto',
              color: 'white',
              border: '1px solid #ccc',
              padding: '8px',
              borderRadius: '4px',
            }}
          />
        </div>

        <div className="back">
          <label>Back</label>
          <div
            className="editable-content text-back"
            ref={backRef}
            contentEditable
            onFocus={() => handleSelectionChange(backRef)}
            onMouseUp={() => handleSelectionChange(backRef)}
            onKeyUp={() => handleSelectionChange(backRef)}
            onBlur={() => handleContentChange('back')}
            style={{
              minHeight: '100px',
              overflow: 'auto',
              color: 'white',
              border: '1px solid #ccc',
              padding: '8px',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FlashcardItem;