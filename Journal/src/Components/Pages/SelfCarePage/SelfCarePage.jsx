import { useState, useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import styles from './SelfCarePage.module.css';
import Footer from '../../Footer/Footer';

const getTodayKey = () => {
  const today = new Date().toISOString().split('T')[0];
  return `selfcare-${today}`;
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

const SelfCarePage = () => {
  const [activity, setActivity] = useState('');
  const [completed, setCompleted] = useState(false);
  const [rating, setRating] = useState('');
  const [shareable, setShareable] = useState('');
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(getTodayKey());
    if (saved) {
      const parsed = JSON.parse(saved);
      setActivity(parsed.activity || '');
      setCompleted(parsed.completed || false);
      setRating(parsed.rating || '');
      // setFileData(parsed.fileData || null);
      // setFileName(parsed.fileName || '');
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setFileData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const entry = {
      date: getTodayDisplay(),
      activity,
      completed,
      rating,
      fileData,
      fileName,
    };
    localStorage.setItem(getTodayKey(), JSON.stringify(entry));
    alert('Self-care entry saved!');
    setShareable(JSON.stringify(entry));
    setActivity('');
    setCompleted(false);
    setRating('');
    setFileData(null);
    setFileName('');
  };

  return (
    <div>
      <Navbar />

      <h1> My Self-Care Plan for Today</h1>
      <p>{getTodayDisplay()}</p>
      <br />
      <label>
        <h2>To take care of myself today, I will....?</h2>
        <br />

        <textarea
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          rows={4}
          placeholder='e.g., Take a walk, meditate, read a book...'
          className={styles.area}
        />
      </label>

      <br />
      <br />

      <label>
        <input
          className={styles.comp}
          type='checkbox'
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <p>Mark as completed</p>
      </label>

      <label>
        <p>How enjoyable was it? (1 to 5)</p>
        <br />
        <input
          type='number'
          min='1'
          max='5'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className={styles.box}
        />
      </label>

      <br />
      <br />

      <label>
        <p className={styles.upload}>
          Upload a related photo or file (optional):
        </p>
        <input
          type='file'
          onChange={handleFileUpload}
          accept='image/*,.pdf,.txt'
          className={styles.file}
        />
        {fileName && <p>Uploaded: {fileName}</p>}
      </label>

      <br />
      <br />

      <button
        className={styles.enjoy}
        onClick={handleSave}
      >
        Save
      </button>
      <br></br>
      <br></br>

      {shareable && (
        <div className={styles.entry}>
          <br></br>
          <button
            className={styles.enjoy}
            onClick={() => {
              navigator.clipboard.writeText(shareable);
              alert('Entry copied to clipboard!');
            }}
          >
            Copy
          </button>
        </div>
      )}

      {fileData && fileName && (
        <div className={styles.share}>
          <h3>Uploaded File Preview:</h3>
          {fileData.startsWith('data:image') ? (
            <img
              src={fileData}
              alt='Uploaded'
              style={{ maxWidth: '200px' }}
            />
          ) : (
            <a
              href={fileData}
              download={fileName}
            >
              Download {fileName}
            </a>
          )}
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};

export default SelfCarePage;
