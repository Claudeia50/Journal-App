import { useState, useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import styles from './GratitudePage.module.css';
import Footer from '../../Footer/Footer';

const getTodayKey = () => {
  const today = new Date().toISOString().split('T')[0];
  return `gratitude-${today}`;
};

const getTodayDisplay = () => {
  const today = new Date();
  return today.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const GratitudePage = () => {
  const [entry, setEntry] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(getTodayKey());
    if (saved) setEntry(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem(getTodayKey(), entry);
    alert('Gratitude saved!');
    setEntry('');
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.body}>
        <h1>Gratitude Journal</h1>
        <p>{getTodayDisplay()}</p>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          rows={5}
          placeholder='What are you grateful for today?'
          className={styles.text}
        />
        <br />
        <button onClick={handleSave}>Save</button>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default GratitudePage;
