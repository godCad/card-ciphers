import Button from '../../../components/Button';
import Card from '../../../components/Card';
import styles from '../SubmissionPage.module.css';

interface Props {
  code: string;
  setCode: (value: string) => void;
  isValid: boolean;
  loading: boolean;
  onSubmit: () => void;
}

export default function LegacySubmissionForm({
  code,
  setCode,
  isValid,
  loading,
  onSubmit,
}: Props) {
  return (
    <Card className={styles.legacyFormCard}>
      <h2 className={styles.legacyFormTitle}>Gift Card Code</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <input
          className={styles.legacyInput}
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Enter 16-digit code (e.g. 1234 5678 9012 3456)"
          aria-label="Gift card code"
          disabled={loading}
        />
        <p className={styles.legacyHelper}>Enter the code exactly as shown on your gift card.</p>
        <Button
          type="submit"
          variant="primary"
          disabled={!isValid || loading}
          className={styles.legacySubmit}
        >
          {loading ? 'Checking…' : 'Check balance'}
        </Button>
      </form>
    </Card>
  );
}
