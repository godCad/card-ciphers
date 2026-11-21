import type { SubmissionResult } from '../../../viewmodels/useSubmissionViewModel';
import { XCircleIcon } from '../../../components/icons';
import styles from '../SubmissionPage.module.css';
import FailedModal from './FailedModal';
import PendingModal from './PendingModal';

export default function ResultBanner({
  result,
  amount,
}: {
  result: SubmissionResult;
  amount?: number;
}) {
  if (result === 'pending') {
    return <PendingModal />;
  }

  if (result === 'declined') {
    return <FailedModal amount={amount} />;
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
