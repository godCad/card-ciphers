import { useState } from 'react';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import { ClockIcon } from '../../../components/icons';
import styles from '../SubmissionPage.module.css';

export default function PendingModal() {
  const [open, setOpen] = useState(true);

  return (
    <Modal open={open} onClose={() => setOpen(false)} title="Unable to Confirm">
      <div className={styles.resultModalContent}>
        <span className={`${styles.resultModalIcon} ${styles.resultModalPendingIcon}`}>
          <ClockIcon size={38} />
        </span>
        <p className={styles.resultModalMessage}>Unable to confirm card, try again.</p>
        <p className={styles.resultModalDetail}>Please check back shortly.</p>
        <Button variant="primary" onClick={() => setOpen(false)}>
          Try again
        </Button>
      </div>
    </Modal>
  );
}
