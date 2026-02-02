import { useState } from "react";
import { questions } from "./questions";

function Questionnaire() {
  const [answers, setAnswers] = useState({});

  function handleAnswer(id, value) {
    setAnswers({
      ...answers,
      [id]: value
    });
  }

  return (
    <div>
      <h2>Questionario dolore schiena</h2>

      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: "10px" }}>
          <p>{q.text}</p>

          <button onClick={() => handleAnswer(q.id, true)}>Sì</button>
          <button onClick={() => handleAnswer(q.id, false)}>No</button>
        </div>
      ))}

      <pre>{JSON.stringify(answers, null, 2)}</pre>
    </div>
  );
}

export default Questionnaire;