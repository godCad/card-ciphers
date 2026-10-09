import { useParams } from 'react-router-dom';
import Card from '../../components/Card';
import { useAdminViewModel } from '../../viewmodels/useAdminViewModel';
import AdminHeader from './components/AdminHeader';
import DashboardHero from './components/DashboardHero';
import StatTiles from './components/StatTiles';
import SearchBar from './components/SearchBar';
import SubmissionsTable from './components/SubmissionsTable';
import Pagination from './components/Pagination';
import ConfirmAmountModal from './components/ConfirmAmountModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const { ref = '' } = useParams();
  const vm = useAdminViewModel(ref);

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <AdminHeader name={vm.adminName} />
        <DashboardHero />
        {vm.loading ? (
          <Card className={styles.stateCard}>Loading dashboard…</Card>
        ) : vm.error ? (
          <Card className={styles.stateCard}>{vm.error}</Card>
        ) : (
          <>
            <StatTiles stats={vm.stats} />
            <Card className={styles.tableCard}>
              <div className={styles.tableHead}>
                <h2 className={styles.tableTitle}>Submitted Gift Cards</h2>
                <SearchBar value={vm.search} onChange={vm.setSearch} />
              </div>
              <SubmissionsTable
                rows={vm.paged}
                onConfirm={vm.confirm}
                onDecline={vm.decline}
                onEditAmount={vm.editAmount}
                onDelete={vm.requestDelete}
              />
              <Pagination
                rangeLabel={vm.rangeLabel}
                page={vm.page}
                totalPages={vm.totalPages}
                onPageChange={vm.setPage}
              />
            </Card>
          </>
        )}
        <ConfirmAmountModal
          target={vm.confirmTarget}
          mode={vm.amountMode}
          onCancel={vm.cancelConfirm}
          onConfirm={vm.submitConfirm}
        />
        <ConfirmDeleteModal
          target={vm.deleteTarget}
          onCancel={vm.cancelDelete}
          onConfirm={vm.confirmDelete}
        />
      </div>
    </div>
  );
}
