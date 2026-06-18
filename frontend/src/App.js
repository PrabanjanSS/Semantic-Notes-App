import React, { useState } from 'react';
import AddNote from './components/AddNote';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';

function App() {
  const [notes, setNotes] = useState([]);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      {/* HUD Header Element */}
      <header style={{ marginBottom: '40px', borderBottom: '1px dashed rgba(0, 242, 254, 0.2)', paddingBottom: '20px' }}>
        <h1 style={{ 
          fontFamily: "'Orbitron', sans-serif", 
          fontSize: '2.2rem', 
          letterSpacing: '2px', 
          margin: '0 0 8px 0',
          background: 'linear-gradient(45deg, #00f2fe, #4facfe)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          SEMANTIC MATRIX ENGINE
        </h1>
        <p style={{ color: '#6272a4', fontSize: '0.9rem', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
          Hybrid Vector Isolation Pipeline // Powered by Google Gemini & MongoDB Atlas
        </p>
      </header>

      {/* Main Grid Workspace */}
      <main style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* Left Control Center Panel */}
        <div style={{ flex: '1', minWidth: '340px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h4 style={{ fontFamily: "'Orbitron', sans-serif", marginTop: 0, color: '#00f2fe', letterSpacing: '1px', borderBottom: '1px solid rgba(254,254,254,0.05)', paddingBottom: '10px' }}>
              [01] INGEST DOCUMENT
            </h4>
            <AddNote onNoteAdded={() => console.log("System Matrix Updated.")} />
          </div>
        </div>

        {/* Right Output Stream Panel */}
        <div style={{ flex: '2', minWidth: '500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <SearchBar onSearchResults={(results) => setNotes(results)} onReset={() => setNotes([])} />
          
          <div className="glass-panel" style={{ padding: '24px', flexGrow: 1 }}>
            <h4 style={{ fontFamily: "'Orbitron', sans-serif", marginTop: 0, color: '#9b51e0', letterSpacing: '1px', borderBottom: '1px solid rgba(254,254,254,0.05)', paddingBottom: '10px' }}>
              [02] VECTOR MATCH FLUX OUTPUT ({notes.length})
            </h4>

            {notes.length > 0 ? (
              <NoteList notes={notes} />
            ) : (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '200px', 
                color: '#6272a4',
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textAlign: 'center',
                textTransform: 'uppercase',
                border: '1px dashed rgba(98, 114, 164, 0.2)',
                borderRadius: '8px',
                marginTop: '15px'
              }}>
                Awaiting input stream parameters...<br/>Run a target vector query to map context.
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;