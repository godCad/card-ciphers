import styles from '../AdminDashboard.module.css';

export default function DashboardHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <h1 className={styles.heroTitle}>Gift Card Verification Center</h1>
        <p className={styles.heroSubtitle}>Review submitted gift cards and update their verification status.</p>
      </div>
      <div className={styles.heroArt}>
        <img src="/apple_admin_banner.png" alt="Gift card" className={styles.heroImage} />
      </div>
    </section>
  );
}
