import { useState } from 'react';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import { XCircleIcon } from '../../../components/icons';
import { formatAmount } from '../../../models/giftCardSubmission';
import styles from '../SubmissionPage.module.css';

interface Props {
  amount?: number;
}

export default function FailedModal({ amount }: Props) {
  const [open, setOpen] = useState(true);

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
