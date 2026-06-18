import React, { useState } from 'react';
import axios from 'axios';

function AddNote({ onNoteAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Work');
  
  // Status states: 'idle' | 'loading' | 'success' | 'error'
  const [vectorizeStatus, setVectorizeStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    
    setVectorizeStatus('loading');
    
    try {
      // Keeping your explicit Render API URL unchanged
      await axios.post('https://semantic-notes-app.onrender.com/api/notes', { title, content, category });
      
      // Update state to success to change button text and appearance
      setVectorizeStatus('success');
      
      // Clear inputs
      setTitle('');
      setContent('');
      setCategory('Work');
      onNoteAdded();

      // Reset the button back to normal after 4 seconds
      setTimeout(() => {
        setVectorizeStatus('idle');
      }, 4000);

    } catch (err) {
      console.error('Error saving matrix document:', err);
      setVectorizeStatus('error');
      
      // Reset button on error after 4 seconds so user can try again
      setTimeout(() => {
        setVectorizeStatus('idle');
      }, 4000);
    }
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    color: '#f0f4f8',
    marginBottom: '6px',
    fontFamily: "'Plus Jakarta Sans', sans-serif"
  };

  // Helper function to dynamically change the button text
  const getButtonText = () => {
    switch (vectorizeStatus) {
      case 'loading':
        return 'VECTORIZING...';
      case 'success':
        return '✓ COMPLETED & PUSHED SUCCESSFULLY TO ATLAS!';
      case 'error':
        return '❌ ERROR VECTORIZING NOTE';
      default:
        return 'VECTORIZE & PUSH TO ATLAS';
    }
  };

  // Helper function to handle dynamic button styling based on execution status
  const getButtonStyle = () => {
    let baseColor = '#f0f4f8';
    let textColor = '#0a0c10';

    if (vectorizeStatus === 'success') {
      baseColor = '#28a745'; // Clean Success Green
      textColor = '#ffffff';
    } else if (vectorizeStatus === 'error') {
      baseColor = '#dc3545'; // Clean Error Red
      textColor = '#ffffff';
    }

    return {
      padding: '12px', 
      backgroundColor: baseColor, 
      color: textColor, 
      border: 'none', 
      borderRadius: '6px', 
      cursor: vectorizeStatus === 'loading' ? 'not-allowed' : 'pointer',
      fontFamily: "'Orbitron', sans-serif",
      fontWeight: 'bold',
      letterSpacing: '1px',
      marginTop: '5px',
      transition: 'all 0.2s ease'
    };
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
      <h3 style={{ margin: '0 0 10px 0', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#6272a4' }}>➕</span> Create Knowledge Document
      </h3>

      <div>
        <label style={labelStyle}>Document Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter concept designation..." 
          required 
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <label style={labelStyle}>Attribute Category Filter</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%' }}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="Health">Health</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Raw Contextual Content String</label>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Input neural data here..." 
          required 
          style={{ width: '100%', height: '100px', resize: 'vertical' }}
        />
      </div>

      <button 
        type="submit" 
        disabled={vectorizeStatus === 'loading'}
        style={getButtonStyle()}
        onMouseEnter={(e) => {
          // Only trigger hover effect if button is in normal idle status
          if (vectorizeStatus === 'idle') {
            e.target.style.backgroundColor = '#00f2fe';
          }
        }}
        onMouseLeave={(e) => {
          // Reset to correct status color on leave
          if (vectorizeStatus === 'idle') {
            e.target.style.backgroundColor = '#f0f4f8';
          } else if (vectorizeStatus === 'success') {
            e.target.style.backgroundColor = '#28a745';
          } else if (vectorizeStatus === 'error') {
            e.target.style.backgroundColor = '#dc3545';
          }
        }}
      >
        {getButtonText()}
      </button>
    </form>
  );
}

export default AddNote;