import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';


function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [reminder, setReminder] = useState('');
  const [color, setColor] = useState('#ffffff'); 

  useEffect(() => {
  
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
   
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const creationDate = new Date().toLocaleString();
    const newNote = {
      title,
      body,
      reminder,
      color,
      creationDate,
    };
    setNotes([...notes, newNote]);
    
    setTitle('');
    setBody('');
    setReminder('');
  };

  const removeNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <h1>NOTEPAD</h1>
      <div>
        <label>Title:</label><br/>
        <input type="text" size="9" value={title} onChange={(e) => setTitle(e.target.value)} /><br/>
      </div>
      <div>
        <label>Body:</label><br/>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} /><br/>
      </div>
      <div>
        <label>Reminder:</label><br/>
        <input type="datetime-local" value={reminder} onChange={(e) => setReminder(e.target.value)} /><br/>
      </div>
      <div>
        <label>Color:</label><br/>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <button onClick={addNote} className='b'>Add Notes!</button>

      <div id="notes-container">
        {notes.map((note, index) => (
          <div key={index} className="note" style={{ backgroundColor: note.color }}>
            <span className="remove-btn" onClick={() => removeNote(index)}>
              Remove
            </span>
            <strong>{note.title}</strong>
            <p>{note.body}</p>
            {note.reminder && <p>Reminder: {note.reminder}</p>}
            <p>Created on: {note.creationDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



export default App;
