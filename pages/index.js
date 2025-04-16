// pages/index.js
import { useState } from 'react';
import { loginWithEmail, signUpWithEmail, loginWithGoogle } from '../firebase/auth';
import Image from 'next/image'

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleGoogleAuth = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div className="auth-container">
                <Image
                className='headlo'
                src="/logo.png"
                width={280}
                height={64}
                alt="Logo"
                />
      <div className="auth-form-container">
        <h2>{isLogin ? 'Logowanie' : 'Rejestracja'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleEmailAuth} className="auth-form">
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Hasło:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn primary-btn">
            {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
          </button>
        </form>
        
        <button 
          onClick={handleGoogleAuth} 
          className="btn google-btn"
        >
          Zaloguj przez Google
          <Image
                className='gggle'
                src="/search.png"
                width={20}
                height={20}
                alt="Logo"
          />
        </button>
        
        <p className="toggle-auth">
          {isLogin ? "Nie masz jeszcze konta? " : "Masz już konto? "}
          <button 
            className="text-btn" 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Zarejestuj się' : 'Zaloguj się'}
          </button>
        </p>
      </div>
    </div>
  );
}