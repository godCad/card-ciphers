import { useParams } from 'react-router-dom';
import { useSubmissionViewModel } from '../../viewmodels/useSubmissionViewModel';
import Header from './components/Header';
import Hero from './components/Hero';
import SubmissionForm from './components/SubmissionForm';
import ResultBanner from './components/ResultBanner';
import ClientConfirmModal from './components/ClientConfirmModal';
import TrustFooter from './components/TrustFooter';
import styles from './SubmissionPage.module.css';

export default function SubmissionPage() {
  const { ref = '' } = useParams();
  const vm = useSubmissionViewModel(ref);
  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <Header />
        <div className={styles.body}>
          <Hero />
          <SubmissionForm
            code={vm.code}
            setCode={vm.setCode}
            isValid={vm.isValid}
            loading={vm.result === 'loading'}
            onSubmit={vm.submit}
          />
          <ResultBanner result={vm.result} />
        </div>
        <TrustFooter />
      </div>
      <ClientConfirmModal
        open={vm.result === 'confirmed'}
        amount={vm.confirmedAmount}
        last4={vm.last4}
        onClose={vm.reset}
      />
    </div>
  );
}
