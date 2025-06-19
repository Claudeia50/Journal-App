import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} Reverie · A space for self-reflection and
        stardust thoughts
      </p>
      <p className={styles.quote}>
        “Even the darkest night will end and the sun will rise.” — Victor Hugo
      </p>
    </footer>
  );
};

export default Footer;
