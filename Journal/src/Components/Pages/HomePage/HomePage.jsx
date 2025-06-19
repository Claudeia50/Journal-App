import React, { useEffect, useState } from 'react';
import { useAffirmation } from '../../../Context/AffirmationContext';
import Navbar from '../../Navbar/Navbar';
import styles from './HomePage.module.css';
import Footer from '../../Footer/Footer';

const getYesterdayKey = () => {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const dateStr = now.toISOString().split('T')[0];
  return `gratitude-${dateStr}`;
};

const HomePage = () => {
  const affirmation = useAffirmation();
  const today = new Date().toLocaleDateString();
  const [yesterdayGratitude, setYesterdayGratitude] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(true);

  useEffect(() => {
    const key = getYesterdayKey();
    const gratitude = localStorage.getItem(key);
    if (gratitude) {
      setYesterdayGratitude(gratitude);
    }
  }, []);

  const handleSearch = () => {
    const results = [];
    const searchLower = searchTerm.toLowerCase();

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);

      if (
        (key.startsWith('journal-') ||
          key.startsWith('gratitude-') ||
          key.startsWith('selfcare-')) &&
        value.toLowerCase().includes(searchLower)
      ) {
        results.push({ key, value });
      }
    }

    setSearchResults(results);
  };

  const handleClose = () => {
    setShowResults(false);
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Daily Affirmation</h1>
        <h2>Welcome to your daily dose of AWESOMENESS!!</h2>
        <br />
        <span>
          <b>Today's date is </b>
          {today}
        </span>

        <div style={{ marginTop: '3rem' }}>
          <h2>
            <b>Your daily affirmation:</b>
          </h2>
          <p>{affirmation ? affirmation : 'Loading...'}</p>

          {yesterdayGratitude && (
            <div style={{ marginTop: '2rem' }}>
              <h2>
                <b>Yesterday you were grateful for:</b>
              </h2>
              <p>{yesterdayGratitude}</p>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h2>Search Past Entries</h2>
        <input
          className={styles.entry}
          type='text'
          placeholder='Search journal, gratitude, self-care...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={styles.past}
          onClick={handleSearch}
        >
          Search
        </button>

        {searchResults.length > 0 && showResults && (
          <div
            style={{
              marginTop: '1rem',
              position: 'relative',
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
            }}
          >
            <h3>Search Results:</h3>
            <ul>
              {searchResults.map((item, index) => (
                <li key={index}>
                  <strong>{item.key}</strong>: {item.value}
                </li>
              ))}
            </ul>
            <button
              className={styles.closeButton}
              onClick={handleClose}
            >
              ×
            </button>
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
