import React, { useState, useEffect } from 'react';

const SYMPTOMS = [
  "Alterazioni cutanee",
  "Angina/compressione del petto",
  "Ansia",
  "Astenia/stanchezza",
  "Diarrea",
  "Febbre",
  "Mal di gola",
  "Mal di schiena",
  "Nausea",
  "Reflusso",
  "Sensazione di ripienezza precoce",
  "Stipsi",
  "Tosse/problemi respiratori",
  "Vertigini",
  "Vomito"
].sort();

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [symptomsData, setSymptomsData] = useState({}); // salvataggio persistente

  // carica da localStorage al montaggio
  useEffect(() => {
    const saved = localStorage.getItem('symptomsData');
    if (saved) setSymptomsData(JSON.parse(saved));
  }, []);

  // salva su localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem('symptomsData', JSON.stringify(symptomsData));
  }, [symptomsData]);

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  // chiave per localStorage
  const getDateKey = (day) => `${year}-${currentMonth.getMonth() + 1}-${day}`;

  const toggleSymptom = (day, symptom) => {
    const key = getDateKey(day);
    const daySymptoms = symptomsData[key] || [];
    const updated = daySymptoms.includes(symptom)
      ? daySymptoms.filter(s => s !== symptom)
      : [...daySymptoms, symptom];
    setSymptomsData({ ...symptomsData, [key]: updated });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <button onClick={prevMonth}>◀</button>
        <h2 style={{ margin: '0 15px' }}>{monthName} {year}</h2>
        <button onClick={nextMonth}>▶</button>
      </div>

      {/* Giorni */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {daysArray.map(day => {
          const key = getDateKey(day);
          const hasSymptoms = symptomsData[key] && symptomsData[key].length > 0;
          return (
            <div key={day} style={{ margin: '2px', position: 'relative' }}>
              <button
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: selectedDay === day
                    ? '#87cefa'
                    : hasSymptoms ? '#ff4d4d' : '#eee',
                  border: '1px solid #ccc',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedDay(selectedDay === day ? null : day)}
              >
                {day}
              </button>

              {/* Dropdown sintomi */}
              {selectedDay === day && (
                <div
                  style={{
                    position: 'absolute',
                    top: '45px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    padding: '5px',
                    zIndex: 10,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    minWidth: '200px'
                  }}
                >
                  {SYMPTOMS.map(symptom => {
                    const checked = symptomsData[key]?.includes(symptom) || false;
                    return (
                      <div key={symptom}>
                        <label>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleSymptom(day, symptom)}
                          />
                          {symptom}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
