import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUserSurveys, getAllSurveys, deleteSurvey } from '../firebase/firestore'; 
import useAuth from '../hooks/useAuth';
import SurveyCard from '../components/SurveyCard';

export default function Dashboard() {
  const { user } = useAuth();
  const [userSurveys, setUserSurveys] = useState([]);
  const [allSurveys, setAllSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isUserSurveysOpen, setIsUserSurveysOpen] = useState(true);

  // Odczytaj stan z localStorage przy pierwszym renderze
  useEffect(() => {
    const savedState = localStorage.getItem('isUserSurveysOpen');
    if (savedState !== null) {
      setIsUserSurveysOpen(savedState === 'true');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const userSurveysData = await getUserSurveys(user.uid);
          setUserSurveys(userSurveysData);
        }
        const allSurveysData = await getAllSurveys();
        setAllSurveys(allSurveysData);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // Zapisuj stan do localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem('isUserSurveysOpen', isUserSurveysOpen);
  }, [isUserSurveysOpen]);

  const handleSurveyDelete = async (surveyId) => {
    try {
      await deleteSurvey(surveyId);
      setUserSurveys(prevState => prevState.filter(survey => survey.id !== surveyId));
      setAllSurveys(prevState => prevState.filter(survey => survey.id !== surveyId));

      setPopupMessage('Ankieta została usunięta!');
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      console.error('Błąd przy usuwaniu ankiety:', error);
    }
  };

  const toggleUserSurveysPanel = () => {
    setIsUserSurveysOpen(prevState => !prevState);
  };

  if (loading) return <div className="loading">Ładowanie ankiet...</div>;

  return (
    <div className="dashboard-container">
      {showPopup && (
        <div className="popup">
          <p>{popupMessage}</p>
        </div>
      )}
      
      {user && (
        <>
          <div className="dashboard-header">
            <h1>Twoje ankiety</h1>
            <button className="btn primary-btn" onClick={toggleUserSurveysPanel}>
              {isUserSurveysOpen ? 'Schowaj' : 'Pokaż'} panel
            </button>
            <Link href="/create-survey">
              <button className="btn primary-btn">Stwórz nową ankietę</button>
            </Link>
          </div>

          {isUserSurveysOpen && (
            <div className="surveys-section">
              {userSurveys.length === 0 ? (
                <div className="empty-state">
                  <p>Nie stworzyłeś jeszcze żadnych ankiet.</p>
                  <Link href="/create-survey">
                    <button className="btn primary-btn">Stwórz ankietę</button>
                  </Link>
                </div>
              ) : (
                <div className="surveys-grid">
                  {userSurveys.map(survey => (
                    <SurveyCard 
                      key={survey.id} 
                      survey={survey} 
                      isOwner={true} 
                      onDelete={handleSurveyDelete} 
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
      
      <div className="section-divider"></div>
      
      <div className="dashboard-header">
        <h1>Wszystkie dostępne ankiety</h1>
      </div>
      
      {allSurveys.length === 0 ? (
        <div className="empty-state">
          <p>Nie ma jeszcze żadnych dostępnych ankiet.</p>
        </div>
      ) : (
        <div className="surveys-grid">
          {allSurveys.map(survey => (
            <SurveyCard 
              key={survey.id} 
              survey={survey} 
              isOwner={user ? survey.createdBy === user.uid : false} 
              onDelete={handleSurveyDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
