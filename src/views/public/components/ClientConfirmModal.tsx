import { formatAmount } from '../../../models/giftCardSubmission';
import styles from '../SubmissionPage.module.css';

interface Props {
  open: boolean;
  amount?: number;
  last4?: string;
  onClose: () => void;
}

export default function ClientConfirmModal({ open, amount, last4, onClose }: Props) {
  if (!open) return null;

  return (
    <div className={styles.closing} role="dialog" aria-modal="true" aria-labelledby="closing-title">
      <h1 id="closing-title" className={styles.closingTitle}>
        Check Your Apple Gift Card Balance
      </h1>
      <p className={styles.closingLabel}>Here's your balance</p>
      <p className={styles.closingAmount}>{formatAmount(amount)}</p>
      <p className={styles.closingLast4}>Gift card ending in ...{last4}</p>
      <button type="button" className={styles.closingLink} onClick={onClose}>
        Check another gift card &gt;
      </button>
      <div className={styles.closingImage}>
        <img src="/dang-banner.jpeg" alt="Apple Gift Card" />
      </div>
    </div>
  );
}
