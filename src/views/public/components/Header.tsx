import { useEffect, useState } from 'react';
import styles from '../SubmissionPage.module.css';

const menuItems = [
  'Store',
  'Mac',
  'iPad',
  'iPhone',
  'Watch',
  'Vision',
  'AirPods',
  'TV & Home',
  'Entertainment',
  'Accessories',
  'Support',
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <img src="/apple_logo.png" alt="Apple" className={styles.brandLogo} />
          <div className={styles.headerActions}>
            <button type="button" className={styles.headerIconButton} aria-label="Search">
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <circle cx="13.5" cy="13.5" r="9.5" />
                <path d="m21 21 7 7" />
              </svg>
            </button>
            <button type="button" className={styles.headerIconButton} aria-label="Shopping bag">
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <path d="M6 10h20l-1.5 19h-17z" />
                <path d="M11 11V8a5 5 0 0 1 10 0v3" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.headerIconButton}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <path d="M4 8h24M4 16h24M4 24h24" />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <span className={styles.productName}>Apple Gift Card</span>
          <button type="button" className={styles.buyButton}>Buy</button>
        </div>
      </header>
      {menuOpen && (
        <div className={styles.menuOverlay} role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button
            type="button"
            className={styles.menuClose}
            aria-label="Close navigation menu"
            autoFocus
            onClick={() => setMenuOpen(false)}
          >
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <path d="m8 8 32 32M40 8 8 40" />
            </svg>
          </button>
          <nav aria-label="Main navigation">
            <ul className={styles.menuList}>
              {menuItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
