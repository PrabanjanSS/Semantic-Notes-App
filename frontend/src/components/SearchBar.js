import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearchResults, onReset }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [scope, setScope] = useState('title');
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setSearching(true);
    try {
      const res = await axios.get('https://semantic-notes-app.onrender.com/api/notes/search', {
        params: { query, category, scope }
      });
      onSearchResults(res.data);
    } catch (err) {
      console.error('Core scan dropped:', err);
    } finally {
      setSearching(false);
    }
  };

  // Modern input focus/base styling configuration object
  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    marginTop: '6px',
    backgroundColor: '#0f111a',
    border: '1px solid rgba(0, 242, 254, 0.2)',
    borderRadius: '6px',
    color: '#f0f4f8',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#6272a4',
    fontFamily: "'Orbitron', sans-serif"
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        
        {/* Input Bar Field */}
        <div style={{ flex: '2', minWidth: '220px' }}>
          <label style={labelStyle}>Search Query String</label>
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Type neural key concept..." 
            required 
            style={inputStyle}
          />
        </div>

        {/* Target Router Scope Selection */}
        <div style={{ flex: '1', minWidth: '160px' }}>
          <label style={labelStyle}>Routing Filter Target</label>
          <select value={scope} onChange={(e) => setScope(e.target.value)} style={inputStyle}>
            <option value="title">Topic / Title Search</option>
            <option value="content">Deep Content Search</option>
          </select>
        </div>

        {/* Hybrid Isolation Sector Selection */}
        <div style={{ flex: '1', minWidth: '140px' }}>
          <label style={labelStyle}>Matrix Cluster Isolation</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
            <option value="All">All Clusters</option>
            <option value="Work">Work Sector</option>
            <option value="Personal">Personal Sector</option>
            <option value="Study">Study Sector</option>
            <option value="Health">Health Sector</option>
          </select>
        </div>

        {/* Dynamic Interactive Execution Terminal Keys */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            disabled={searching} 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: 'transparent',
              border: '1px solid #00f2fe',
              borderRadius: '6px',
              color: '#00f2fe',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.8rem',
              cursor: 'pointer',
              letterSpacing: '1px',
              boxShadow: '0 0 10px rgba(0, 242, 254, 0.1)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(0, 242, 254, 0.1)'; e.target.style.boxShadow = '0 0 15px rgba(0, 242, 254, 0.3)'; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.boxShadow = '0 0 10px rgba(0, 242, 254, 0.1)'; }}
          >
            {searching ? 'COMPUTING...' : 'RUN_QUERY'}
          </button>
          
          <button 
            type="button" 
            onClick={() => { setQuery(''); setCategory('All'); setScope('title'); onReset(); }} 
            style={{ 
              padding: '10px 15px', 
              backgroundColor: 'transparent',
              border: '1px solid rgba(98, 114, 164, 0.4)',
              borderRadius: '6px',
              color: '#6272a4',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#f0f4f8'}
            onMouseLeave={(e) => e.target.style.color = '#6272a4'}
          >
            RESET
          </button>
        </div>

      </form>
    </div>
  );
}

export default SearchBar;