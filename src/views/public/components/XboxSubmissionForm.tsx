import styles from '../XboxSubmissionPage.module.css';

interface Props {
  code: string;
  setCode: (value: string) => void;
  isValid: boolean;
  loading: boolean;
  onSubmit: () => void;
}

export default function XboxSubmissionForm({
  code,
  setCode,
  isValid,
  loading,
  onSubmit,
}: Props) {
  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
        setCode('')
      }}
    >
      <label className={styles.label} htmlFor="xbox-gift-card-code">
        25-character code
      </label>
      <input
        id="xbox-gift-card-code"
        className={styles.input}
        value={code}
        onChange={(event) => setCode(event.target.value)}
        placeholder="XXXXX XXXXX XXXXX XXXXX XXXXX"
        autoComplete="off"
        autoCapitalize="characters"
        aria-label="Xbox gift card code"
        disabled={loading}
      />
      <p className={styles.hint}>Enter the code from your Xbox gift card.</p>
      <button className={styles.submit} type="submit" disabled={!isValid || loading}>
        {loading ? 'Checking…' : 'Check balance'}
      </button>
    </form>
  );
}
