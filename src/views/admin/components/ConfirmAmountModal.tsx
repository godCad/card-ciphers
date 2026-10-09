import { useEffect, useState } from 'react';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import { maskCardNumber, type GiftCardSubmission } from '../../../models/giftCardSubmission';
import type { AmountMode } from '../../../viewmodels/useAdminViewModel';
import styles from '../AdminDashboard.module.css';

interface Props {
  target: GiftCardSubmission | null;
  mode: AmountMode;
  onCancel: () => void;
  onConfirm: (amount: number) => void;
}

export default function ConfirmAmountModal({ target, mode, onCancel, onConfirm }: Props) {
  const isEdit = mode === 'edit';
  const [amount, setAmount] = useState('');

  // reset whenever a different row opens the modal; editing starts from the saved amount.
  // keyed on id/mode only, so a background refresh cannot clobber what is being typed.
  useEffect(() => {
    setAmount(isEdit && target?.amount != null ? String(target.amount) : '');
  }, [target?.id, isEdit]);

  const parsed = Number(amount);
  const isValid = amount.trim() !== '' && Number.isFinite(parsed) && parsed > 0;

  return (
    <Modal
      open={target !== null}
      onClose={onCancel}
      title={isEdit ? 'Edit Amount' : 'Confirm Gift Card'}
    >
      {target && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isValid) onConfirm(parsed);
          }}
        >
          <p className={styles.modalText}>
            {isEdit ? 'Update' : 'Enter'} the verified amount for card{' '}
            {maskCardNumber(target.cardNumber)}.
          </p>
          <label className={styles.modalLabel} htmlFor="confirm-amount">
            Amount (USD)
          </label>
          <div className={styles.amountField}>
            <span className={styles.amountPrefix}>$</span>
            <input
              id="confirm-amount"
              className={styles.amountInput}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              inputMode="decimal"
              autoFocus
            />
          </div>
          <div className={styles.modalActions}>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={!isValid}>
              {isEdit ? 'Save' : 'Confirm'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
