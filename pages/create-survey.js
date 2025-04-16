// pages/create-survey.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import { createSurvey, emojiList } from '../firebase/firestore';
import EmojiPicker from '../components/EmojiPicker';
import QuestionForm from '../components/QuestionForm';

export default function CreateSurvey() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [questions, setQuestions] = useState([{
    text: '',
    options: ['', '']
  }]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const addQuestion = () => {
    setQuestions([...questions, {
      text: '',
      options: ['', '']
    }]);
  };
  
  const updateQuestion = (index, updatedQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };
  
  const handleAddOption = (questionIndex) => {
    if (questions[questionIndex].options.length < 4) {
      const newQuestions = [...questions];
      newQuestions[questionIndex].options.push('');
      setQuestions(newQuestions);
    }
  };
  
  const handleRemoveOption = (questionIndex, optionIndex) => {
    if (questions[questionIndex].options.length > 2) {
      const newQuestions = [...questions];
      newQuestions[questionIndex].options.splice(optionIndex, 1);
      setQuestions(newQuestions);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate survey
    if (!title.trim()) {
      setError('Wprowadź tytuł ankiety');
      return;
    }
    
    if (!selectedEmoji) {
      setError('Wybierz emotkę dla swojej ankiety');
      return;
    }
    
    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].text.trim()) {
        setError(`Pytanie ${i + 1} potrzebuje tekstu!`);
        return;
      }
      
      for (let j = 0; j < questions[i].options.length; j++) {
        if (!questions[i].options[j].trim()) {
          setError(`Odpowiedź ${j + 1} w pytaniu ${i + 1} nie może być pusta`);
          return;
        }
      }
    }
    
    try {
      setIsSubmitting(true);
      
      const surveyData = {
        title,
        emoji: selectedEmoji,
        questions,
        createdAt: new Date()
      };
      
      const docRef = await createSurvey(user.uid, surveyData);
      router.push('/dashboard');
    } catch (error) {
      setError('Bład, ankieta nie została stworzona: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="create-survey-container">
      <h1>Stwórz ankietę</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tytuł ankiety:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Wprowadź tytuł ankiety"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Wybierz emotke:</label>
          <EmojiPicker
            emojis={emojiList}
            selectedEmoji={selectedEmoji}
            onSelect={setSelectedEmoji}
          />
        </div>
        
        <h2>Pytania</h2>
        
        {questions.map((question, index) => (
          <QuestionForm
            key={index}
            question={question}
            questionIndex={index}
            updateQuestion={updateQuestion}
            addOption={handleAddOption}
            removeOption={handleRemoveOption}
          />
        ))}
        
        <div className="form-actions">
          <button 
            type="button" 
            className="btn secondary-btn" 
            onClick={addQuestion}
          >
            Dodaj kolejne pytanie
          </button>
          
          <button 
            type="submit" 
            className="btn primary-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Tworzenie...' : 'Stwórz ankiete'}
          </button>
        </div>
      </form>
    </div>
  );
}