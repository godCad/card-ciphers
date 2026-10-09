import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import { maskCardNumber, type GiftCardSubmission } from '../../../models/giftCardSubmission';
import styles from '../AdminDashboard.module.css';

interface Props {
  target: GiftCardSubmission | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({ target, onCancel, onConfirm }: Props) {
  return (
    <Modal open={target !== null} onClose={onCancel} title="Delete Gift Card">
      {target && (
        <>
          <p className={styles.modalText}>
            Delete card {maskCardNumber(target.cardNumber)}? It will no longer appear on this
            dashboard.
          </p>
          <div className={styles.modalActions}>
            <Button variant="outline" onClick={onCancel}>
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
