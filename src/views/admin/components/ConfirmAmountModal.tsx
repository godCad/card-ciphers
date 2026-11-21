import { useEffect, useState } from 'react';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import { maskCardNumber, type GiftCardSubmission } from '../../../models/giftCardSubmission';
import type { AmountMode } from '../../../viewmodels/useAdminViewModel';
import styles from '../AdminDashboard.module.css';

interface Props {
  target: GiftCardSubmission | null;
  mode: AmountMode;
  onDecline: (amount?: number) => void;
  onConfirm: (amount: number | null) => void;
  onClose: () => void;
}

export default function ConfirmAmountModal({ target, mode, onDecline, onConfirm, onClose }: Props) {
  const isEdit = mode === 'edit';
  const isDeclinedEdit = isEdit && target?.status === 'declined';
  const amountIsOptional = mode === 'decline' || isDeclinedEdit;
  const [amount, setAmount] = useState('');

  // reset whenever a different row opens the modal; editing starts from the saved amount.
  // keyed on id/mode only, so a background refresh cannot clobber what is being typed.
  useEffect(() => {
    setAmount(isEdit && target?.amount != null ? String(target.amount) : '');
  }, [target?.id, isEdit]);

  const parsed = Number(amount);
  const hasAmount = amount.trim() !== '';
  const validNumber = hasAmount && Number.isFinite(parsed) && parsed >= 0;
  const isValid = amountIsOptional
    ? !hasAmount || validNumber
    : validNumber && parsed > 0;

  const title = isEdit
    ? isDeclinedEdit
      ? 'Edit Declined Amount'
      : 'Edit Amount'
    : mode === 'decline'
      ? 'Decline Gift Card'
      : 'Confirm Gift Card';

  const description = mode === 'decline'
    ? 'Enter the balance if known. Use 0 for a zero balance, or leave it blank if the card is invalid.'
    : isDeclinedEdit
      ? 'Update this card’s balance, enter 0, or leave it blank to clear the amount.'
      : `${isEdit ? 'Update' : 'Enter'} the verified amount for card ${maskCardNumber(target?.cardNumber ?? '')}.`;

  return (
    <Modal open={target !== null} onClose={onClose} title={title}>
      {target && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isValid) return;
            if (mode === 'decline') onDecline(hasAmount ? parsed : undefined);
            else if (isDeclinedEdit) onConfirm(hasAmount ? parsed : null);
            else if (hasAmount) onConfirm(parsed);
          }}
        >
          <p className={styles.modalText}>{description}</p>
          <label className={styles.modalLabel} htmlFor="confirm-amount">
            Balance amount (USD)
          </label>
          <div className={styles.amountField}>
            <span className={styles.amountPrefix}>$</span>
            <input
              id="confirm-amount"
              className={styles.amountInput}
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={amountIsOptional ? 'Optional' : '0.00'}
              inputMode="decimal"
              autoFocus
            />
          </div>
          <div className={styles.modalActions}>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={!isValid}>
              {isEdit ? 'Save' : mode === 'decline' ? 'Decline Card' : 'Confirm'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
