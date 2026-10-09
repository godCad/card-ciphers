import {
  formatAmount,
  formatSubmittedAt,
  isTerminal,
  type GiftCardSubmission,
} from '../../../models/giftCardSubmission';
import { GiftGlyph, TrashIcon } from '../../../components/icons';
import Button from '../../../components/Button';
import StatusChip from './StatusChip';
import styles from '../AdminDashboard.module.css';

interface Props {
  rows: GiftCardSubmission[];
  onConfirm: (id: string) => void;
  onDecline: (id: string) => void;
  onEditAmount: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function SubmissionsTable({
  rows,
  onConfirm,
  onDecline,
  onEditAmount,
  onDelete,
}: Props) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Gift Card</th>
            <th>Submitted</th>
            <th>Status</th>
            <th>Amount</th>
            <th className={styles.actionsCol}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className={styles.empty}>
                No gift cards match your search.
              </td>
            </tr>
          )}
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <span className={styles.cardCell}>
                  <span className={styles.cardIcon}>
                    <GiftGlyph size={16} />
                  </span>
                 {row.cardNumber}
                </span>
              </td>
              <td className={styles.muted}>{formatSubmittedAt(row.submittedAt)}</td>
              <td>
                <StatusChip status={row.status} />
              </td>
              <td className={styles.amountCell}>{formatAmount(row.amount)}</td>
              <td>
                <div className={styles.actions}>
                  {!isTerminal(row.status) ? (
                    <>
                      <Button variant="primary" onClick={() => onConfirm(row.id)}>
                        Confirm
                      </Button>
                      <Button variant="outline" onClick={() => onDecline(row.id)}>
                        Decline
                      </Button>
                    </>
                  ) : row.status === 'confirmed' ? (
                    <Button variant="outline" onClick={() => onEditAmount(row.id)}>
                      Edit
                    </Button>
                  ) : (
                    <Button variant="outline">View</Button>
                  )}
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => onDelete(row.id)}
                    aria-label={`Delete card ${row.cardNumber}`}
                    title="Delete"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
