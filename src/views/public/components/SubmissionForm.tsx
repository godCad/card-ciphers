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

export default function SubmissionForm({ code, setCode, isValid, loading, onSubmit }: Props) {
  return (
    <Card className={styles.formCard}>
      <h2 className={styles.formTitle}>Gift Card Code</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          className={styles.input}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 16-digit code (e.g. 1234 5678 9012 3456)"
          inputMode="numeric"
          aria-label="Gift card code"
          disabled={loading}
        />
        <p className={styles.helper}>Enter the code exactly as shown on your gift card.</p>
        <Button type="submit" variant="primary" disabled={!isValid || loading} className={styles.submit}>
          {loading ? 'Checking…' : 'Confirm'}
        </Button>
      </form>
    </Card>
  );
}
