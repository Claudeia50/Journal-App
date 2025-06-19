import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccountPage.module.css';
import Footer from '../../Footer/Footer';
import SHA256 from 'crypto-js/sha256';

const CreateAccountModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('signin'); // 'signin' or 'create'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const openModal = (selectedMode) => {
    setMode(selectedMode); // explicitly set mode
    setIsOpen(true);
    setError('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) return setError('Email is required.');
    if (password.length < 8)
      return setError('Password must be at least 8 characters.');

    const hashedPassword = SHA256(password).toString();

    if (mode === 'signin') {
      const stored = localStorage.getItem('account');
      if (!stored) return setError('No account found. Please create one.');
      const account = JSON.parse(stored);
      if (account.email !== email || account.password !== hashedPassword) {
        return setError('Invalid email or password.');
      }
      setIsOpen(false);
      navigate('/HomePage');
    } else {
      const newAccount = { email, password: hashedPassword };
      localStorage.setItem('account', JSON.stringify(newAccount));
      setIsOpen(false);
      navigate('/HomePage');
    }
  };

  return (
    <>
      <div className={styles.body}>
        <img
          className={styles.logo2}
          src='./images/logo.png'
          alt='Reverie Logo'
        />

        <div>
          <button
            onClick={() => openModal('signin')}
            className={styles.openBtn}
          >
            Sign In
          </button>
          <button
            onClick={() => openModal('create')}
            className={styles.create}
          >
            Create Account
          </button>
        </div>

        {isOpen && (
          <div
            className='modal-overlay'
            onClick={() => setIsOpen(false)}
          >
            <div
              className='modal-content'
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className={styles.account}>
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type='password'
                  placeholder='Password (min 8 chars)'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <p className={styles.error}>{error}</p>}
                <button
                  className={styles.switch}
                  type='submit'
                >
                  {mode === 'signin' ? 'Sign In' : 'Create'}
                </button>
                <button
                  type='button'
                  className='close-btn'
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        <div>
          <p className={styles.intro}>
            Welcome to Reverie ~ Where Your Thoughts, Gratitude, and Growth Flow
            Freely
            <br />
            <br />
            Every story, every reflection, every fleeting thought deserves a
            space to be captured. Reverie is more than a journaling app—it's a
            sanctuary for self-discovery, a canvas for creativity, and a vault
            for personal growth.
            <br />
            <br />
            Start each day with gratitude, embrace moments of self-care, and
            stay organized with thoughtful to-do lists. Whether you're
            chronicling life’s beauty, reflecting on challenges, or setting
            intentions for tomorrow, Reverie is designed to meet you where you
            are.
            <br />
            <br />
            Let your words spill onto the page. Prioritize yourself, your joy,
            and your journey. It all starts here.
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CreateAccountModal;
