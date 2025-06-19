import { createContext, useContext, useEffect, useState } from 'react';

const AffirmationContext = createContext();

export const AffirmationProvider = ({ children }) => {
  const [affirmation, setAffirmation] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dailyAffirmation'));
    const today = new Date().toISOString().slice(0, 10);

    if (stored && stored.date === today) {
      setAffirmation(stored.quote);
      console.log(stored.quote);
    } else {
      fetch(
        'https://api.codetabs.com/v1/proxy/?quest=https://affirmations.dev/'
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          const quote = data.affirmation;
          console.log(quote);
          setAffirmation(quote);
          localStorage.setItem(
            'dailyAffirmation',
            JSON.stringify({ date: today, quote })
          );
        })
        .catch((err) => {
          console.error('Error fetching affirmation:', err);
        });
    }
  }, []);

  return (
    <AffirmationContext.Provider value={affirmation}>
      {children}
    </AffirmationContext.Provider>
  );
};

export const useAffirmation = () => useContext(AffirmationContext);
