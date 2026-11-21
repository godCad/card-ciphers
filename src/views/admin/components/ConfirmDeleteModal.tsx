import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import { maskCardNumber, type GiftCardSubmission } from '../../../models/giftCardSubmission';
import styles from '../AdminDashboard.module.css';

interface Props {
  target: GiftCardSubmission | null;
  onDecline: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({ target, onDecline, onConfirm }: Props) {
  return (
    <Modal open={target !== null} onClose={onDecline} title="Delete Gift Card">
      {target && (
        <>
          <p className={styles.modalText}>
            Delete card {maskCardNumber(target.cardNumber)}? It will no longer appear on this
            dashboard.
          </p>
          <div className={styles.modalActions}>
            <Button variant="outline" onClick={onDecline}>
              Cancel
            </Button>
            <Button variant="primary" className={styles.dangerAction} onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}
