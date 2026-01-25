import React from 'react';
import Calendar from './Calendar';
import './App.css';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Symptom Tracker</h1>
      <Calendar />
    </div>
  );
}

export default App;
