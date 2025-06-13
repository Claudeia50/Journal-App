import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <img
        className={styles.logo2}
        src='./images/logo.png'
        alt='Reverie Logo'
      />
      <nav className={styles.nav}>
        <ul className={styles.navLink}>
          <li>
            <Link
              to='/HomePage'
              className={styles.link}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/JournalPage'
              className={styles.link}
            >
              Journal
            </Link>
          </li>
          <li>
            <Link
              to='/GratitudePage'
              className={styles.link}
            >
              Gratitude
            </Link>
          </li>
          <li>
            <Link
              to='/SelfCarePage'
              className={styles.link}
            >
              Self-Care
            </Link>
          </li>
          <li>
            <Link
              to='/TodoPage'
              className={styles.link}
            >
              Todo
            </Link>
          </li>
          <li>
            <Link
              to='/'
              className={styles.link}
            >
              Sign Out
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
