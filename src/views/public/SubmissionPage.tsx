import { useParams } from 'react-router-dom';
import { useSubmissionViewModel } from '../../viewmodels/useSubmissionViewModel';
import Header from './components/Header';
import SubmissionForm from './components/SubmissionForm';
import ResultBanner from './components/ResultBanner';
import ClientConfirmModal from './components/ClientConfirmModal';
import ClientFooterTabs from './components/ClientFooterTabs';
import styles from './SubmissionPage.module.css';

export default function SubmissionPage() {
  const { ref = '' } = useParams();
  const vm = useSubmissionViewModel(ref);
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.panel}>
        <div className={styles.body}>
          <SubmissionForm
            code={vm.code}
            setCode={vm.setCode}
            isValid={vm.isValid}
            loading={vm.result === 'loading'}
            onSubmit={vm.submit}
          />
          <ResultBanner result={vm.result} amount={String(vm.confirmedAmount)} />
        </div>
      </div>
      <img
        className={styles.footerBanner}
        src="/dang-banner.jpeg"
        alt="Colorful Apple gift cards"
      />
      <ClientFooterTabs />
      <ClientConfirmModal
        open={vm.result === 'confirmed'}
        amount={Number(vm.confirmedAmount)}
        last4={vm.last4}
        onClose={vm.reset}
      />
    </div>
  );
}
