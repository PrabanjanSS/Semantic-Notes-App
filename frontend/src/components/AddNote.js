import React, { useState } from 'react';
import axios from 'axios';

function AddNote({ onNoteAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Work');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Creating text-embedding-004 vectors...');
    try {
      await axios.post('http://localhost:5003/api/notes', { title, content, category });
      setTitle('');
      setContent('');
      setStatus('Successfully indexed!');
      onNoteAdded();
    } catch (err) {
      setStatus('Failed data sync execution.');
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h3>➕ Create Knowledge Document</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Document Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Attribute Category Filter</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
            <option value="Health">Health</option>
          </select>
        </div>
        <div className="form-group">
          <label>Raw Contextual Content String</label>
          <textarea rows="4" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button type="submit">Vectorize & Push to Atlas</button>
      </form>
      {status && <p className="status-msg">{status}</p>}
    </div>
  );
}

export default AddNote;