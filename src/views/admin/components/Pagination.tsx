import { ChevronLeftIcon, ChevronRightIcon } from '../../../components/icons';
import styles from '../AdminDashboard.module.css';

interface Props {
  rangeLabel: string;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ rangeLabel, page, totalPages, onPageChange }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className={styles.pagination}>
      <span className={styles.rangeLabel}>{rangeLabel}</span>
      <div className={styles.pager}>
        <button
          className={styles.pageArrow}
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeftIcon size={16} />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            className={`${styles.pageNum} ${p === page ? styles.pageActive : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
        <button
          className={styles.pageArrow}
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          <ChevronRightIcon size={16} />
        </button>
      </div>
    </div>
  );
}
