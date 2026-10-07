import type { SubmissionStats } from '../../../models/giftCardSubmission';
import { CheckCircleIcon, ClockIcon, DocIcon, XCircleIcon } from '../../../components/icons';
import styles from '../AdminDashboard.module.css';

export default function StatTiles({ stats }: { stats: SubmissionStats }) {
  const tiles = [
    { label: 'Total Submitted', value: stats.totalSubmitted, toneClass: styles.toneNeutral, icon: <DocIcon size={18} /> },
    { label: 'Pending Review', value: stats.pendingReview, toneClass: styles.toneAmber, icon: <ClockIcon size={18} /> },
    { label: 'Confirmed', value: stats.confirmed, toneClass: styles.toneGreen, icon: <CheckCircleIcon size={18} /> },
    { label: 'Declined', value: stats.declined, toneClass: styles.toneRed, icon: <XCircleIcon size={18} /> },
  ];
  return (
    <div className={styles.tiles}>
      {tiles.map((tile) => (
        <div key={tile.label} className={`${styles.tile} ${tile.toneClass}`}>
          <span className={styles.tileIcon}>{tile.icon}</span>
          <span className={styles.tileLabel}>{tile.label}</span>
          <span className={styles.tileValue}>{tile.value}</span>
        </div>
      ))}
    </div>
  );
}
