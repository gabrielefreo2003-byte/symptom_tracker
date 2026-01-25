import React, { useState, useEffect } from 'react';

function Calendar() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  // Giorno selezionato
  const [selectedDay, setSelectedDay] = useState(null);

  // Sintomi salvati
  const [symptoms, setSymptoms] = useState({});

  const symptomOptions = ['Febbre', 'Nausea', 'Vomito', 'Diarrea', 'Mal di schiena'];

  // Carica i dati dal localStorage quando il componente si monta
  useEffect(() => {
    const saved = localStorage.getItem('symptoms');
    if (saved) {
      setSymptoms(JSON.parse(saved));
    }
  }, []);

  // Salva i dati nel localStorage ogni volta che cambiano
  useEffect(() => {
    localStorage.setItem('symptoms', JSON.stringify(symptoms));
  }, [symptoms]);

  const toggleSymptom = (symptom) => {
    setSymptoms((prev) => {
      const daySymptoms = prev[selectedDay] || [];
      if (daySymptoms.includes(symptom)) {
        return { ...prev, [selectedDay]: daySymptoms.filter((s) => s !== symptom) };
      } else {
        return { ...prev, [selectedDay]: [...daySymptoms, symptom] };
      }
    });
  };

  return (
    <div>
      <h2>Calendario dei sintomi</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '300px' }}>
        {days.map((day) => (
          <button
            key={day}
            style={{
              width: '40px',
              height: '40px',
              margin: '2px',
              cursor: 'pointer',
              backgroundColor: selectedDay === day ? '#87cefa' : '#eee',
            }}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {selectedDay && (
        <div style={{ marginTop: '20px' }}>
          <h3>Inserisci sintomi per il giorno {selectedDay}</h3>
          {symptomOptions.map((symptom) => (
            <label key={symptom} style={{ display: 'block' }}>
              <input
                type="checkbox"
                checked={(symptoms[selectedDay] || []).includes(symptom)}
                onChange={() => toggleSymptom(symptom)}
              />
              {symptom}
            </label>
          ))}

          <p>
            Sintomi selezionati:{' '}
            {(symptoms[selectedDay] || []).join(', ') || 'Nessuno'}
          </p>
        </div>
      )}
    </div>
  );
}

export default Calendar;



