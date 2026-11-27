import { useEffect } from 'react';
import { formatAmount } from '../../../models/giftCardSubmission';
import styles from '../GiftCardDemoPage.module.css';

interface Props {
  message: string;
  detail?: string;
  amount?: number;
  last4?: string;
  buttonLabel: string;
  onClose: () => void;
}

export default function DemoResultModal({
  message,
  detail,
  amount,
  last4,
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
      className={styles.resultOverlay}
      role="presentation"
      onClick={onClose}
    >
      <section
        className={styles.resultCard}
        role="dialog"
        aria-modal="true"
        aria-label={message}
        onClick={(event) => event.stopPropagation()}
      >
        <span className={styles.resultCoin} aria-hidden="true">G</span>
        <p className={styles.resultMessage}>{message}</p>
        {detail && <p className={styles.resultDetail}>{detail}</p>}
        {typeof amount === 'number' && Number.isFinite(amount) && (
          <p className={styles.resultAmount}>{formatAmount(amount)}</p>
        )}
        {last4 && (
          <p className={styles.resultLast4}>Gift card ending in …{last4}</p>
        )}
        <button type="button" className={styles.resultButton} onClick={onClose}>
          {buttonLabel}
        </button>
      </section>
    </div>
  );
}
