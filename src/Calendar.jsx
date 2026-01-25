import React, { useState } from 'react';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  // Cambiare mese
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  // Numero di giorni nel mese
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });

  return (
    <div style={{ maxWidth: '320px', marginTop: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={prevMonth}>◀</button>
        <h2>{monthName} {currentMonth.getFullYear()}</h2>
        <button onClick={nextMonth}>▶</button>
      </div>

      {/* Giorni */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {daysArray.map((day) => (
          <button
            key={day}
            style={{
              width: '40px',
              height: '40px',
              margin: '2px',
              backgroundColor: selectedDay === day ? '#87cefa' : '#eee',
              border: '1px solid #ccc',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Giorno selezionato */}
      {selectedDay && <p>Hai selezionato il giorno {selectedDay} {monthName}</p>}
    </div>
  );
}

export default Calendar;