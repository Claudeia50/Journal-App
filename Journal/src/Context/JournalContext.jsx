import { createContext, useState, useEffect } from 'react';

console.log('📘 JournalContext loaded');
export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState(() => new Date());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    console.log('🟢 useEffect (load) triggered');
    const savedEntries = localStorage.getItem('journalEntries');
    const backupKey = `journalBackup-${new Date().toISOString().split('T')[0]}`;
    const dailyBackup = localStorage.getItem(backupKey);

    if (savedEntries) {
      console.log('📥 Loaded from journalEntries');
      setEntries(JSON.parse(savedEntries));
    } else if (dailyBackup) {
      console.log('📦 Loaded from daily backup');
      setEntries(JSON.parse(dailyBackup));
    } else {
      console.log('⚠️ No saved entries found');
    }
  }, []);

  useEffect(() => {
    console.log('💾 useEffect (save) triggered', entries);
    if (entries.length === 0) return;

    localStorage.setItem('journalEntries', JSON.stringify(entries));

    const today = new Date().toISOString().split('T')[0];
    const backupKey = `journalBackup-${today}`;
    if (!localStorage.getItem(backupKey)) {
      localStorage.setItem(backupKey, JSON.stringify(entries));
    }
  }, [entries]);

  const handleAddEntry = () => {
    if (!title.trim() || !content.trim()) return;

    console.log('Adding entry:', { title, content });

    const newEntry = {
      date: date.toDateString(),
      title,
      content,
    };
    setEntries([newEntry, ...entries]);
    setTitle('');
    setContent('');
  };

  return (
    <JournalContext.Provider
      value={{
        entries,
        setEntries,
        date,
        setDate,
        title,
        setTitle,
        content,
        setContent,
        handleAddEntry,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};
