import {
  formatAmount,
  formatSubmittedAt,
  isTerminal,
  type GiftCardSubmission,
} from '../../../models/giftCardSubmission';
import { GiftGlyph } from '../../../components/icons';
import Button from '../../../components/Button';
import StatusChip from './StatusChip';
import styles from '../AdminDashboard.module.css';

interface Props {
  rows: GiftCardSubmission[];
  onConfirm: (id: string) => void;
  onDecline: (id: string) => void;
}

export default function SubmissionsTable({ rows, onConfirm, onDecline }: Props) {
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
                  {isTerminal(row.status) ? (
                    <Button variant="outline">View</Button>
                  ) : (
                    <>
                      <Button variant="primary" onClick={() => onConfirm(row.id)}>
                        Confirm
                      </Button>
                      <Button variant="outline" onClick={() => onDecline(row.id)}>
                        Decline
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
