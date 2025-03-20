import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBold, 
  faItalic, 
  faUnderline, 
  faSuperscript, 
  faSubscript, 
  faPalette, 
  faHighlighter, 
  faEraser 
} from '@fortawesome/free-solid-svg-icons';
import '../styles/TextFormattingToolbar.css';

const TextFormattingToolbar = ({ editorRef, selectionRangeRef, activeFormats = {}, onFormatChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  
  // Standard text color options
  const colorOptions = [
    '#000000', '#FF0000', '#0000FF', '#008000', 
    '#FFA500', '#800080', '#A52A2A', '#808080'
  ];
  
  // Highlight color options
  const highlightOptions = [
    '#FFFF00', '#00FFFF', '#FF00FF', '#90EE90',
    '#FFD700', '#FFA07A', '#87CEFA', '#D3D3D3'
  ];

  // Restore the saved selection so that execCommand applies to the right text
  const restoreSelection = () => {
    if (!editorRef || !editorRef.current) return false;
    
    // Focus the element first
    editorRef.current.focus();
    
    const selection = window.getSelection();
    selection.removeAllRanges();
    
    if (selectionRangeRef && selectionRangeRef.current) {
      try {
        selection.addRange(selectionRangeRef.current);
        return true;
      } catch (e) {
        console.error("Failed to restore selection:", e);
        return false;
      }
    }
    return false;
  };

  // Apply a formatting command (e.g., bold, italic, etc.)
  const applyFormatting = (command, value = null) => {
    // Skip if editor is not active
    if (!editorRef || !editorRef.current) return;
    
    // Restore selection if possible, or just focus
    const selectionRestored = restoreSelection();
    if (!selectionRestored) {
      editorRef.current.focus();
    }
    
    // Apply the command
    document.execCommand(command, false, value);
    
    // Update active formats state
    if (onFormatChange) {
      const newActiveFormats = { ...activeFormats };
      
      // Toggle format state based on command
      switch (command) {
        case 'bold':
          newActiveFormats.bold = !activeFormats.bold;
          break;
        case 'italic':
          newActiveFormats.italic = !activeFormats.italic;
          break;
        case 'underline':
          newActiveFormats.underline = !activeFormats.underline;
          break;
        case 'superscript':
          newActiveFormats.superscript = !activeFormats.superscript;
          newActiveFormats.subscript = false; // Can't be both
          break;
        case 'subscript':
          newActiveFormats.subscript = !activeFormats.subscript;
          newActiveFormats.superscript = false; // Can't be both
          break;
        case 'removeFormat':
          // Reset all formats
          newActiveFormats.bold = false;
          newActiveFormats.italic = false;
          newActiveFormats.underline = false;
          newActiveFormats.superscript = false;
          newActiveFormats.subscript = false;
          break;
        default:
          break;
      }
      
      onFormatChange(newActiveFormats);
    }
    
    // Save the updated HTML content
    if (editorRef && editorRef.current) {
      // Create a custom event to trigger a content update
      const event = new Event('input', { bubbles: true });
      editorRef.current.dispatchEvent(event);
    }
  };

  // Effect to handle clicks outside of color pickers
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showColorPicker || showHighlightPicker) {
        // Close color pickers when clicking outside
        setShowColorPicker(false);
        setShowHighlightPicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker, showHighlightPicker]);

  return (
    <div className="text-formatting-toolbar">
      <button 
        onMouseDown={(e) => {
          e.preventDefault();
          applyFormatting('bold');
        }} 
        title="Bold"
        className={`toolbar-button ${activeFormats.bold ? 'active' : ''}`}
        type="button"
        disabled={!editorRef}
      >
        <FontAwesomeIcon icon={faBold} />
      </button>
      
      <button 
        onMouseDown={(e) => {
          e.preventDefault();
          applyFormatting('italic');
        }} 
        title="Italic"
        className={`toolbar-button ${activeFormats.italic ? 'active' : ''}`}
        type="button"
        disabled={!editorRef}
      >
        <FontAwesomeIcon icon={faItalic} />
      </button>
      
      <button 
        onMouseDown={(e) => {
          e.preventDefault();
          applyFormatting('underline');
        }} 
        title="Underline"
        className={`toolbar-button ${activeFormats.underline ? 'active' : ''}`}
        type="button"
        disabled={!editorRef}
      >
        <FontAwesomeIcon icon={faUnderline} />
      </button>
      
      <button 
        onMouseDown={(e) => {
          e.preventDefault();
          applyFormatting('superscript');
        }} 
        title="Superscript"
        className={`toolbar-button ${activeFormats.superscript ? 'active' : ''}`}
        type="button"
        disabled={!editorRef}
      >
        <FontAwesomeIcon icon={faSuperscript} />
      </button>
      
      <button 
        onMouseDown={(e) => {
          e.preventDefault();
          applyFormatting('subscript');
        }} 
        title="Subscript"
        className={`toolbar-button ${activeFormats.subscript ? 'active' : ''}`}
        type="button"
        disabled={!editorRef}
      >
        <FontAwesomeIcon icon={faSubscript} />
      </button>
      
      <div className="color-picker-container">
        <button 
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowColorPicker(!showColorPicker);
            setShowHighlightPicker(false);
          }} 
          title="Text Color"
          className="toolbar-button"
          type="button"
          disabled={!editorRef}
        >
          <FontAwesomeIcon icon={faPalette} />
        </button>
        
        {showColorPicker && (
          <div 
            className="color-palette"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {colorOptions.map(color => (
              <div 
                key={color}
                className="color-option"
                style={{ backgroundColor: color }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  applyFormatting('foreColor', color);
                  setShowColorPicker(false);
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="color-picker-container">
        <button 
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowHighlightPicker(!showHighlightPicker);
            setShowColorPicker(false);
          }} 
          title="Highlight Color"
          className="toolbar-button"
          type="button"
          disabled={!editorRef}
        >
          <FontAwesomeIcon icon={faHighlighter} />
        </button>
        
        {showHighlightPicker && (
          <div 
            className="color-palette"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {highlightOptions.map(color => (
              <div 
                key={color}
                className="color-option"
                style={{ backgroundColor: color }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  applyFormatting('hiliteColor', color);
                  setShowHighlightPicker(false);
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <button 
        onMouseDown={(e) => {
          e.preventDefault();
          applyFormatting('removeFormat');
        }} 
        title="Remove Formatting"
        className="toolbar-button"
        type="button"
        disabled={!editorRef}
      >
        <FontAwesomeIcon icon={faEraser} />
      </button>
    </div>
  );
};

export default TextFormattingToolbar;