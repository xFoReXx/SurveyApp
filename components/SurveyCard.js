// components/SurveyCard.js
import { useState } from 'react';
import Link from 'next/link';

export default function SurveyCard({ survey, isOwner, onDelete }) {
  const [isDeleted, setIsDeleted] = useState(false); // Stan usuwania ankiety (opcjonalny, jeśli chcesz)

  const handleDelete = () => {
    if (onDelete) {
      onDelete(survey.id); // Wywołujemy funkcję usuwania przekazaną z rodzica
      setIsDeleted(true); // Możesz usunąć ten stan, jeśli nie potrzebujesz go w tym komponencie
    }
  };

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  if (isDeleted) return null; // Usuwamy kartę po jej usunięciu

  return (
    <div className="survey-card">
      <div className="survey-card-header">
        <span className="survey-emoji">{survey.emoji}</span>
        <h2 className="survey-title">{survey.title}</h2>
      </div>
      
      <div className="survey-card-info">
        <p>Ilość pytań: {survey.questions.length}</p>
        <p>Odpowiedziało: {survey.responses ? survey.responses.length : 0}</p>
        <p>Stworzono : {formatDate(survey.createdAt)}</p>
      </div>
      
      <div className="survey-card-actions">
        <Link href={`/surveys/${survey.id}`}>
          <button className="btn primary-btn">Wypełnij</button>
        </Link>
        
        {isOwner && (
          <button onClick={handleDelete} className="btn delete-btn">
            Usuń
          </button>
        )}
      </div>
    </div>
  );
}
