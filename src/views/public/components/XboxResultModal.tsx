import { useEffect } from 'react';
import { formatAmount } from '../../../models/giftCardSubmission';
import styles from '../XboxSubmissionPage.module.css';

interface Props {
  message: string;
  detail?: string;
  amount?: number;
  buttonLabel: string;
  onClose: () => void;
}

export default function XboxResultModal({
  message,
  detail,
  amount,
  buttonLabel,
  onClose,
}: Props) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      className={styles.successOverlay}
      role="presentation"
      onClick={onClose}
    >
      <section
        className={styles.successCard}
        role="dialog"
        aria-modal="true"
        aria-label={message}
        onClick={(event) => event.stopPropagation()}
      >
        <p className={styles.successMessage}>{message}</p>
        {detail && <p className={styles.successDetail}>{detail}</p>}
        {typeof amount === 'number' && Number.isFinite(amount) && (
          <p className={styles.successAmount}>{formatAmount(amount)}</p>
        )}
        <button type="button" className={styles.successButton} onClick={onClose}>
          {buttonLabel}
        </button>
      </section>
    </div>
  );
}
