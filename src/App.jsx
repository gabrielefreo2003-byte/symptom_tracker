import React from 'react';
import Calendar from './Calendar';
import './App.css';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',   // orizzontale
        alignItems: 'center',       // verticale
        height: '100vh',            // altezza 100% viewport
        fontFamily: 'sans-serif',
        flexDirection: 'column'
      }}
    >
      <h1>Symptom Tracker</h1>
      <Calendar />
    </div>
  );
}

export default App;

