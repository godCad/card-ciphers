import type { SubmissionResult } from '../../../viewmodels/useSubmissionViewModel';
import { ClockIcon, XCircleIcon } from '../../../components/icons';
import styles from '../SubmissionPage.module.css';

export default function ResultBanner({ result }: { result: SubmissionResult }) {
  if (result === 'pending') {
    return (
      <div className={`${styles.banner} ${styles.bannerPending}`}>
        <span className={styles.bannerIcon}>
          <ClockIcon size={18} />
        </span>
        <div>
          <p className={styles.bannerTitle}>Unable to confirm card, try again.</p>
          <p className={styles.bannerText}>Please check back shortly.</p>
        </div>
      </div>
    );
  }

  if (result === 'declined') {
    return (
      <div className={`${styles.banner} ${styles.bannerDeclined}`}>
        <span className={styles.bannerIcon}>
          <XCircleIcon size={18} />
        </span>
        <div>
          <p className={styles.bannerTitle}>Invalid card.</p>
          <p className={styles.bannerText}>This card could not be verified.</p>
        </div>
      </div>
    );
  }

  if (result === 'error') {
    return (
      <div className={`${styles.banner} ${styles.bannerDeclined}`}>
        <span className={styles.bannerIcon}>
          <XCircleIcon size={18} />
        </span>
        <div>
          <p className={styles.bannerTitle}>Something went wrong.</p>
          <p className={styles.bannerText}>Please try again in a moment.</p>
        </div>
      </div>
    );
  }

  return null;
}
