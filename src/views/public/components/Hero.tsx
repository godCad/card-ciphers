import styles from '../SubmissionPage.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <h1 className={styles.heroTitle}>Apple Gift Card</h1>
        <p className={styles.heroSubtitle}>
          Enter your gift card code below to submit it for verification. Make sure to enter the code
          exactly as shown on your gift card.
        </p>
      </div>
      <div className={styles.heroArt}>
        <img src="/apple_client_banner.png" alt="Gift card" className={styles.heroImage} />
      </div>
    </section>
  );
}
