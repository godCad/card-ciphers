import { formatAmount } from '../../../models/giftCardSubmission';
import styles from '../SubmissionPage.module.css';
import XboxResultModal from './XboxResultModal';

interface Props {
  open: boolean;
  amount?: number;
  last4?: string;
  onClose: () => void;
  brandName?: string;
  showImage?: boolean;
}

export default function ClientConfirmModal({
  open,
  amount,
  last4,
  onClose,
  brandName = 'Apple',
  showImage = true,
}: Props) {
  if (!open) return null;
  const isXbox = brandName === 'Xbox';

  if (isXbox) {
    return (
      <XboxResultModal
        message="Your gift card balance is:"
        amount={amount}
        buttonLabel="CHECK ANOTHER CARD"
        onClose={onClose}
      />
    );
  }

  return (
    <div
      className={styles.closing}
      role="dialog"
      aria-modal="true"
      aria-labelledby="closing-title"
    >
      <h1 id="closing-title" className={styles.closingTitle}>
        Check Your {brandName} Gift Card Balance
      </h1>
      <p className={styles.closingLabel}>Here's your balance</p>
      <p className={styles.closingAmount}>{formatAmount(amount)}</p>
      <p className={styles.closingLast4}>Gift card ending in ...{last4}</p>
      <button
        type="button"
        className={styles.closingLink}
        onClick={onClose}
      >
        Check another gift card &gt;
      </button>
      {showImage && (
        <div className={styles.closingImage}>
          <img src="/dang-banner.jpeg" alt={`${brandName} Gift Card`} />
        </div>
      )}
    </div>
  );
}
