import { useState } from 'react';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import { XCircleIcon } from '../../../components/icons';
import { formatAmount } from '../../../models/giftCardSubmission';
import styles from '../SubmissionPage.module.css';
import DemoResultModal from './DemoResultModal';
import XboxResultModal from './XboxResultModal';

interface Props {
  amount?: number;
  isXbox?: boolean;
  isDemo?: boolean;
}

export default function FailedModal({ amount, isXbox = false, isDemo = false }: Props) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  if (isXbox) {
    return (
      <XboxResultModal
        message="Invalid gift card"
        detail="This code could not be verified. Please try again."
        amount={amount}
        buttonLabel="TRY AGAIN"
        onClose={() => setOpen(false)}
      />
    );
  }

  if (isDemo) {
    return (
      <DemoResultModal
        message="Invalid gift card"
        detail="This code could not be verified. Please try again."
        amount={amount}
        buttonLabel="Try again"
        onClose={() => setOpen(false)}
      />
    );
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)} title="Invalid Card">
      <div className={styles.resultModalContent}>
        <span className={`${styles.resultModalIcon} ${styles.resultModalErrorIcon}`}>
          <XCircleIcon size={38} />
        </span>
        <p className={styles.resultModalMessage}>
          This gift card could not be verified. Check the PIN and try again.
        </p>
        {typeof amount === 'number' && Number.isFinite(amount) && (
          <p className={styles.resultModalAmount}>{formatAmount(amount)}</p>
        )}
        <Button variant="outline" onClick={() => setOpen(false)}>
          Try again
        </Button>
      </div>
    </Modal>
  );
}
