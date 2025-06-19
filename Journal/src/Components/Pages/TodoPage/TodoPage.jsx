import React, { useContext, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TodoContext } from '../../../context/TodoContext';
import Navbar from '../../Navbar/Navbar';
import styles from './TodoPage.module.css';
import Footer from '../../Footer/Footer';

function MyTodoCalendar() {
  const { todos, addTodo, toggleTodo, removeTodo, editTodos } =
    useContext(TodoContext);
  const [newTodo, setNewTodo] = useState('');
  const [entries, setEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [editText, setEditText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('#66b3ff');
  const [isCompleted, setIsCompleted] = useState(false);

  // Load entries from localStorage
  useEffect(() => {
    try {
      const savedEntries = JSON.parse(localStorage.getItem('calendarEntries'));
      if (savedEntries && typeof savedEntries === 'object') {
        setEntries(savedEntries);
      }
    } catch (e) {
      console.error('Error loading entries:', e);
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(entries).length > 0) {
      localStorage.setItem('calendarEntries', JSON.stringify(entries));
    }
  }, [entries]);

  const handleDateClick = (arg) => {
    const current = entries[arg.dateStr];
    setSelectedDate(arg.dateStr);
    setEditText(current?.text || '');
    setSelectedColor(current?.color || '#66b3ff');
    setIsCompleted(current?.completed || false);
  };

  const events = Object.entries(entries)
    .filter(([_, data]) =>
      (typeof data === 'string' ? data : data.text)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .map(([date, data]) => ({
      title:
        typeof data === 'string'
          ? data
          : data.completed
          ? `✅ ${data.text}`
          : data.text,
      date,
      backgroundColor: typeof data === 'string' ? undefined : data.color,
    }));

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <br></br>
        <br></br>
        <br></br>
        <h1 className={styles.to}>To Do</h1>
        <div className={styles.calendarContainer}>
          <div className={styles.searchContainer}>
            <input
              type='text'
              placeholder='Search to-dos...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth',
            }}
            dateClick={handleDateClick}
            events={events}
            eventDidMount={(info) => {
              info.el.addEventListener('dblclick', () => {
                const clickedDate = info.event.startStr;
                const current = entries[clickedDate];
                setSelectedDate(clickedDate);
                setEditText(info.event.title);
                setSelectedColor(current?.color || '#66b3ff');
                setIsCompleted(current?.completed || false);
              });
            }}
            height='auto'
          />
          {selectedDate && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h3 className={styles.edit}>Edit Entry for {selectedDate}</h3>
                <div className={styles.modalContent}>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={5}
                    className={styles.inside}
                  />
                  <div className={styles.colorPalette}>
                    <span>Choose a color:</span>
                    <div className={styles.colorOptions}>
                      {[
                        '#66b3ff',
                        '#ff9999',
                        '#99ff99',
                        '#ffcc99',
                        '#cc99ff',
                        '#ffff99',
                        '#ffb3e6',
                        '#c2f0c2',
                      ].map((color) => (
                        <div
                          key={color}
                          className={`${styles.colorSwatch} ${
                            selectedColor === color ? styles.selectedSwatch : ''
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                  <label>
                    <input
                      type='checkbox'
                      checked={isCompleted}
                      onChange={() => setIsCompleted(!isCompleted)}
                    />
                    Mark as completed
                  </label>
                </div>

                <div className={styles.modalActions}>
                  <button
                    onClick={() => {
                      setEntries((prev) => ({
                        ...prev,
                        [selectedDate]: {
                          text: editText,
                          color: selectedColor,
                          completed: isCompleted,
                        },
                      }));
                      setSelectedDate(null);
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEntries((prev) => {
                        const copy = { ...prev };
                        delete copy[selectedDate];
                        return copy;
                      });
                      setSelectedDate(null);
                    }}
                  >
                    Delete
                  </button>
                  <button onClick={() => setSelectedDate(null)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default MyTodoCalendar;
