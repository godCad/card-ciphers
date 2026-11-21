import styles from '../SubmissionPage.module.css';

const tabs = [
  'Shop and Learn',
  'Apple Wallet',
  'Account',
  'Entertainment',
  'Apple Store',
  'For Business',
  'For Education',
  'For Healthcare',
  'For Government',
  'Apple Values',
  'About Apple',
];

export default function ClientFooterTabs() {
  return (
    <nav className={styles.footerTabs} aria-label="Footer categories">
      <ul className={styles.footerTabList}>
        {tabs.map((tab) => (
          <li className={styles.footerTab} key={tab}>
            {tab}
          </li>
        ))}
      </ul>
      <div className={styles.footerLegal}>
        <p className={styles.footerLegalLinks}>
          <span>Site map</span>, <span>User Agreement</span>, <span>Privacy</span>,{' '}
          <span>Cookies &amp; AdChoice</span>
        </p>
        <p className={styles.footerCopyright}>Copyright © 2024 Apple Inc.</p>
        <p> Mobile / Classic Site.</p>
      </div>
    </nav>
  );
}
