// pages/profile.js
import { useState } from 'react';
import { changeEmail, changePassword } from '../firebase/auth';
import useAuth from '../hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const isEmailLogin = user?.providerData[0]?.providerId === 'password';
  
  const handleEmailChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await changeEmail(newEmail);
      setSuccess('Email zmieniony pomyślnie');
      setNewEmail('');
    } catch (err) {
      setError('Bład, email nie został zmieniony: ' + err.message);
    }
  };
  
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (newPassword !== confirmPassword) {
      setError('Hasła nie są takie same');
      return;
    }
    
    try {
      await changePassword(newPassword);
      setSuccess('Hasło zostało zmienione');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Bład, hasło nie zostało zmienione: ' + err.message);
    }
  };
  
  return (
    <div className="profile-container">
      <h1>Twój profil</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <div className="profile-info">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Typ konta:</strong> {isEmailLogin ? 'Email/Hasło' : 'Google'}</p>
      </div>
      
      {isEmailLogin && (
        <div className="profile-forms">
          <div className="profile-form-card">
            <h2>Zmień Email</h2>
            <form onSubmit={handleEmailChange}>
              <div className="form-group">
                <label>Nowy Email:</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn primary-btn">
                Zmień Email
              </button>
            </form>
          </div>
          
          <div className="profile-form-card">
            <h2>Zmień hasło</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>Nowe hasło:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Potwierdź nowe hasło:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn primary-btn">
                Zmień hasło
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}