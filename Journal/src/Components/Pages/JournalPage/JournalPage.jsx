import React, { useContext } from 'react';
import styles from './JournalPage.module.css';
import Navbar from '../../Navbar/Navbar';
import { JournalContext } from '../../../Context/JournalContext';
import Footer from '../../Footer/Footer';
console.log('📓 JournalPage loaded');
function JournalPage() {
  const {
    entries,
    date,
    setDate,
    title,
    setTitle,
    content,
    setContent,
    handleAddEntry,
  } = useContext(JournalContext);

  return (
    <>
      <Navbar />
      <div>
        <h1>Daily Journal</h1>
        <h2>Total Entries: {entries.length}</h2>
        <div>
          <input
            type='date'
            value={date ? date.toISOString().split('T')[0] : ''}
            onChange={(e) => setDate(new Date(e.target.value))}
            className={styles.date}
          />
          <input
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.titles}
          />
          <textarea
            placeholder='Write your thoughts here...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
          />
          <button
            onClick={handleAddEntry}
            className={styles.entry}
          >
            Add Entry
          </button>
        </div>

        {entries.map((entry, i) => (
          <div
            className={styles.save}
            key={i}
          >
            <h2>{entry.title}</h2>
            <p>{entry.date}</p>
            <p>{entry.content}</p>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </>
  );
}

export default JournalPage;
