import { BoltIcon, GiftGlyph, ShieldIcon } from '../../../components/icons';
import styles from '../SubmissionPage.module.css';

const items = [
  { title: '100% Authentic', text: 'Only valid gift cards are accepted.', icon: <GiftGlyph size={22} /> },
  { title: 'Secure Processing', text: 'Your information is protected and never shared.', icon: <ShieldIcon size={22} /> },
  { title: 'Fast Verification', text: 'Get your status update quickly.', icon: <BoltIcon size={22} /> },
];

export default function TrustFooter() {
  return (
    <footer className={styles.footer}>
      {items.map((item) => (
        <div key={item.title} className={styles.footerItem}>
          <span className={styles.footerIcon}>{item.icon}</span>
          <p className={styles.footerTitle}>{item.title}</p>
          <p className={styles.footerText}>{item.text}</p>
        </div>
      ))}
    </footer>
  );
}
