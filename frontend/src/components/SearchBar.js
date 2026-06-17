import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearchResults, onReset }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [scope, setScope] = useState('title'); // 🎯 NEW: Tracks user's target choice
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setSearching(true);
    try {
      // 🎯 NEW: Sending the scope parameter to the backend engine
      const res = await axios.get('http://localhost:5003/api/notes/search', {
        params: { query, category, scope }
      });
      onSearchResults(res.data);
    } catch (err) {
      console.error('Frontend search error:', err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="card" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f8f9fa' }}>
      <h3>🔍 Semantic Vector Strategy Search</h3>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '2', minWidth: '200px' }}>
          <label>Query Conceptually</label>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type concept rules here..." required style={{ width: '100%', padding: '8px', marginTop: '4px' }}/>
        </div>

        {/* 🎯 NEW: Target Scope Dropdown */}
        <div style={{ flex: '1', minWidth: '150px' }}>
          <label>Target Scope</label>
          <select value={scope} onChange={(e) => setScope(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '4px' }}>
            <option value="title">Topic / Title Search</option>
            <option value="content">Deep Content Search</option>
          </select>
        </div>

        <div style={{ flex: '1', minWidth: '130px' }}>
          <label>Hybrid Isolation</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '4px' }}>
            <option value="All">All Items</option>
            <option value="Work">Work Filter</option>
            <option value="Personal">Personal Filter</option>
            <option value="Study">Study Filter</option>
            <option value="Health">Health Filter</option>
          </select>
        </div>

        <div>
          <button type="submit" disabled={searching} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {searching ? 'Scanning...' : 'Execute Target Search'}
          </button>
          <button type="button" onClick={() => { setQuery(''); setCategory('All'); setScope('title'); onReset(); }} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '6px' }}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;