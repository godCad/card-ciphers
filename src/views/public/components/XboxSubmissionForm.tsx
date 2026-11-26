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
  const count = code.replace(/[^a-zA-Z0-9]/g, '').length;

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
        setCode('');
      }}
    >
      <label className={styles.label} htmlFor="xbox-gift-card-code">
        ENTER XBOX CARD PIN (25 CHARACTERS)
      </label>
      <div className={styles.inputWrap}>
        <input
          id="xbox-gift-card-code"
          className={styles.input}
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="e.g., ABCD1 2EFG3 4HIJK 5LMNO 6PQRS"
          autoComplete="off"
          autoCapitalize="characters"
          aria-label="Xbox gift card code"
          disabled={loading}
        />
        <span className={styles.counter} aria-live="polite">
          {count}/25
        </span>
      </div>
      <button className={styles.submit} type="submit" disabled={!isValid || loading}>
        {loading ? 'CHECKING…' : 'CHECK BALANCE'}
      </button>
    </form>
  );
}
