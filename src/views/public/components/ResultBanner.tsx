import type { SubmissionResult } from '../../../viewmodels/useSubmissionViewModel';
import { XCircleIcon } from '../../../components/icons';
import styles from '../SubmissionPage.module.css';
import FailedModal from './FailedModal';
import PendingModal from './PendingModal';

export default function ResultBanner({
  result,
  amount,
  theme = 'apple',
}: {
  result: SubmissionResult;
  amount?: number;
  theme?: 'apple' | 'xbox' | 'razzz';
}) {
  if (result === 'pending') {
    return <PendingModal isXbox={theme === 'xbox'} isDemo={theme === 'razzz'} />;
  }

  if (result === 'declined') {
    return (
      <FailedModal
        amount={amount}
        isXbox={theme === 'xbox'}
        isDemo={theme === 'razzz'}
      />
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
