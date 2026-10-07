import { LockIcon } from '../../../components/icons';
import styles from '../SubmissionPage.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.brandMark}>
          <img src="/apple_logo.png" alt="Gift Card Verification logo" className={styles.brandLogo} />
        </span>
        <span className={styles.brandName}>Apple Gift Card</span>
      </div>
      <div className={styles.secure}>
        <LockIcon size={16} />
        <span>Secure &amp; Trusted</span>
      </div>
    </header>
  );
}
