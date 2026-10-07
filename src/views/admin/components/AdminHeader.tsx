
import styles from '../AdminDashboard.module.css';

export default function AdminHeader({  }: { name?: string }) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.brandMark}>
          <img src="/apple_logo.png" alt="Gift Card Administration logo" className={styles.brandLogo} />
        </span>
        <span className={styles.brandName}>Apple Gift Card</span>
      </div>

    </header>
  );
}
