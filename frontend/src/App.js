import React, { useState } from 'react';
import AddNote from './components/AddNote';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';

function App() {
  // Shared state array specifically reserved for verified vector search outputs
  const [notes, setNotes] = useState([]);

  return (
    <div className="app-container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header>
        <h1>🧠 MERN Semantics Engine</h1>
        <p>MongoDB Atlas Vector Search Hybrid Queries leveraging Google Gemini AI</p>
      </header>
      <hr />
      <main style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginTop: '20px' }}>
        <div style={{ flex: '1', minWidth: '320px' }}>
          {/* 🎯 FIXED: Adding a document no longer requests a global document list dump */}
          <AddNote onNoteAdded={() => console.log("New document vectorized and pushed. Search interface ready.")} />
        </div>
        <div style={{ flex: '2', minWidth: '400px' }}>
          {/* 🎯 FIXED: Reset action sets state back to an empty collection */}
          <SearchBar onSearchResults={(results) => setNotes(results)} onReset={() => setNotes([])} />
          
          {/* Only renders metrics panel when there is an active vector lookup response */}
          {notes.length > 0 ? (
            <NoteList notes={notes} />
          ) : (
            <p style={{ color: '#6c757d', marginTop: '20px', textAlign: 'center' }}>
              Dashboard clear. Input your semantic matrix queries above to process data matches.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;