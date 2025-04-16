// pages/surveys/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSurveyById, submitSurveyResponse, getSurveyResults } from '../../firebase/firestore';
import SurveyResults from '../../components/SurveyResults';

export default function SurveyPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (id) {
      fetchSurvey();
    }
  }, [id]);
  
  const fetchSurvey = async () => {
    try {
      const surveyData = await getSurveyById(id);
      setSurvey(surveyData);
      // Initialize answers array with nulls for each question
      setAnswers(new Array(surveyData.questions.length).fill(null));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching survey:', error);
      setError('Unable to load survey. It may have been deleted or you may not have permission to view it.');
      setLoading(false);
    }
  };
  
  const handleAnswerSelect = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all questions are answered
    if (answers.some(answer => answer === null)) {
      setError('Odpowiedz na wszystkie pytania!');
      return;
    }
    
    try {
      await submitSurveyResponse(id, answers);
      const surveyResults = await getSurveyResults(id);
      setResults(surveyResults);
      setSubmitted(true);
      setError('');
    } catch (error) {
      setError('Error submitting response: ' + error.message);
    }
  };
  
  if (loading) return <div className="loading">Ładowanie ankiety...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!survey) return <div className="not-found">Nie odnaleziono ankiety</div>;
  
  return (
    <div className="survey-container">
      <div className="survey-header">
        <span className="survey-emoji">{survey.emoji}</span>
        <h1>{survey.title}</h1>
      </div>
      
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {survey.questions.map((question, qIndex) => (
            <div key={qIndex} className="question-container">
              <h3>
                Pytanie {qIndex + 1}: {question.text}
              </h3>
              <div className="options-container">
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="option">
                    <label>
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        checked={answers[qIndex] === oIndex}
                        onChange={() => handleAnswerSelect(qIndex, oIndex)}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <button type="submit" className="btn primary-btn">
            Zakończ ankiete
          </button>
        </form>
      ) : (
        <div className="results-container">
          <h2>Dziękujemy za wypełnienie ankiety!</h2>
          <p>Jak odpowiadali inni użytkownicy:</p>
          <SurveyResults results={results} />
        </div>
      )}
    </div>
  );
}