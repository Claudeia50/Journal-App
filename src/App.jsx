import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { JournalProvider } from './Context/JournalContext';
import { TodoProvider } from './Context/TodoContext';
import { AffirmationProvider } from './Context/AffirmationContext';
import HomePage from './Components/Pages/HomePage/HomePage';
import JournalPage from './Components/Pages/JournalPage/JournalPage';
import TodoPage from './Components/Pages/TodoPage/TodoPage';
import GratitudePage from './Components/Pages/GratitudePage/GratituePage';
import SelfCarePage from './Components/Pages/SelfCarePage/SelfCarePage';
import Account from './Components/Pages/AccountPage/AccountPage';
import './App.css';

function App() {
  return (
    
    <JournalProvider>
      <TodoProvider>
        <AffirmationProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element={<Account />}
              />
              <Route
                path='/HomePage'
                element={<HomePage />}
              />
              <Route
                path='/JournalPage'
                element={<JournalPage />}
              />
              <Route
                path='/TodoPage'
                element={<TodoPage />}
              />
              <Route
                path='/GratitudePage'
                element={<GratitudePage />}
              />
              <Route
                path='/SelfCarePage'
                element={<SelfCarePage />}
              />
            </Routes>
          </BrowserRouter>
        </AffirmationProvider>
      </TodoProvider>
    </JournalProvider>
  );
}

export default App;
