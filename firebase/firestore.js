import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where,
  updateDoc,
  arrayUnion,
  deleteDoc // Importujemy deleteDoc do usuwania dokumentów
} from 'firebase/firestore';
import { db } from './firebase';

// Emoji list for surveys
export const emojiList = [
  "😀", "😎", "🚀", "🔥", "💡", "🎉", "📊", "📝", "🤔", "👍", 
  "❤️", "🌟", "🎯", "🎲", "🏆", "💬", "📱", "🔍", "⚡", "🎵", 
  "🌈", "🍕", "🚴", "🏠", "🌺", "📚", "💻", "🎮", "🛠️", "🧠"
];

// Create a new survey
export const createSurvey = async (userId, surveyData) => {
  const surveysCollection = collection(db, 'surveys');
  const newSurvey = {
    ...surveyData,
    userId,
    createdAt: new Date(),
    responses: []
  };
  return addDoc(surveysCollection, newSurvey);
};

// Get all surveys for a user
export const getUserSurveys = async (userId) => {
  const surveysCollection = collection(db, 'surveys');
  const q = query(surveysCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Get a specific survey by ID
export const getSurveyById = async (surveyId) => {
  const surveyDoc = doc(db, 'surveys', surveyId);
  const surveySnapshot = await getDoc(surveyDoc);
  
  if (surveySnapshot.exists()) {
    return {
      id: surveySnapshot.id,
      ...surveySnapshot.data()
    };
  } else {
    throw new Error('Ankiety nie odnaleziono');
  }
};

// Submit a response to a survey
export const submitSurveyResponse = async (surveyId, responses) => {
  const surveyDoc = doc(db, 'surveys', surveyId);
  
  return updateDoc(surveyDoc, {
    responses: arrayUnion({
      submittedAt: new Date(),
      answers: responses
    })
  });
};

// Get survey results
export const getSurveyResults = async (surveyId) => {
  const survey = await getSurveyById(surveyId);
  
  // Calculate percentages for each answer
  const results = {};
  
  if (survey.responses && survey.responses.length > 0) {
    survey.questions.forEach((question, questionIndex) => {
      const answerCounts = {};
      question.options.forEach((option, optionIndex) => {
        answerCounts[optionIndex] = 0;
      });
      
      survey.responses.forEach(response => {
        const answer = response.answers[questionIndex];
        if (answer !== undefined) {
          answerCounts[answer]++;
        }
      });
      
      const total = survey.responses.length;
      const percentages = {};
      
      Object.keys(answerCounts).forEach(optionIndex => {
        percentages[optionIndex] = (answerCounts[optionIndex] / total) * 100;
      });
      
      results[questionIndex] = {
        question: question.text,
        options: question.options,
        percentages
      };
    });
  }
  
  return results;
};

// Get all surveys
export const getAllSurveys = async () => {
  try {
    const surveysCollection = collection(db, 'surveys');
    const surveysSnapshot = await getDocs(surveysCollection);
    
    const surveys = [];
    surveysSnapshot.forEach((doc) => {
      surveys.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return surveys;
  } catch (error) {
    console.error('Błąd w odczycie ankiet:', error);
    throw error;
  }
};

// Usuwanie ankiety
export const deleteSurvey = async (surveyId) => {
  try {
    const surveyDoc = doc(db, 'surveys', surveyId);
    await deleteDoc(surveyDoc); // Usuwamy dokument z Firestore
    console.log('Ankieta została usunięta');
  } catch (error) {
    console.error('Błąd przy usuwaniu ankiety:', error);
    throw error; // Możesz dodać bardziej szczegółową obsługę błędów, jeśli potrzebujesz
  }
};
