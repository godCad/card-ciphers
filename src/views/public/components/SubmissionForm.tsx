import styles from '../SubmissionPage.module.css';

interface Props {
  code: string;
  setCode: (value: string) => void;
  isValid: boolean;
  loading: boolean;
  onSubmit: () => void;
}

export default function SubmissionForm({ code, setCode, isValid, loading, onSubmit }: Props) {
  return (
    <section className={styles.formSection}>
      <h1 className={styles.formHeading}>Check Your Apple Gift Card Balance</h1>
      <form
        className={styles.submissionForm}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
          setCode("")
        }}
      >
        <label className={styles.pinLabel} htmlFor="gift-card-pin">
          Enter your PIN here:
        </label>
        <input
          className={styles.input}
          id="gift-card-pin"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Gift Card Pin"
          aria-label="Gift card PIN"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!isValid || loading}
          className={styles.submit}
        >
          {loading ? 'Checking…' : 'Check Balance'}
        </button>
      </form>
    </section>
  );
}
