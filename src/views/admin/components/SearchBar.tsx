import { SearchIcon } from '../../../components/icons';
import styles from '../AdminDashboard.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className={styles.search}>
      <SearchIcon size={16} />
      <input
        className={styles.searchInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by card number..."
        inputMode="numeric"
        aria-label="Search by card number"
      />
    </div>
  );
}
