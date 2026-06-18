import React, { useState } from 'react';
import axios from 'axios';

function AddNote({ onNoteAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Work');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/notes`, { title, content, category });
      setTitle('');
      setContent('');
      setCategory('Work');
      onNoteAdded();
    } catch (err) {
      console.error('Error saving matrix document:', err);
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    color: '#f0f4f8',
    marginBottom: '6px',
    fontFamily: "'Plus Jakarta Sans', sans-serif"
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
        disabled={loading}
        style={{ 
          padding: '12px', 
          backgroundColor: '#f0f4f8', 
          color: '#0a0c10', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: 'pointer',
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 'bold',
          letterSpacing: '1px',
          marginTop: '5px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#00f2fe'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#f0f4f8'}
      >
        {loading ? 'VECTORIZING...' : 'VECTORIZE & PUSH TO ATLAS'}
      </button>
    </form>
  );
}

export default AddNote;