import type { SubmissionResult } from '../../../viewmodels/useSubmissionViewModel';
import { ClockIcon, XCircleIcon } from '../../../components/icons';
import styles from '../SubmissionPage.module.css';
import FailedModal from './FailedModal';

export default function ResultBanner({ result, amount }: { result: SubmissionResult, amount: string }) {
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
    return <FailedModal  amount={amount}/>
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
