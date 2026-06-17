import React from 'react';

function NoteList({ notes }) {
  if (notes.length === 0) return <p>No matrix metrics found. Insert documents or re-phrase constraints.</p>;

  return (
    <div>
      <h3>📋 Vector Match Results ({notes.length})</h3>
      <div>
        {notes.map((note) => (
          <div key={note._id} className="note-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>{note.title}</h4>
              <span className="badge">{note.category}</span>
            </div>
            <p>{note.content}</p>
            {note.score && (
              <div className="score-tag">
                🎯 Cosine Similarity: <strong>{(note.score * 100).toFixed(2)}%</strong>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList;