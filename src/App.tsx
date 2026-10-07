import { Route, Routes } from 'react-router-dom';
import SubmissionPage from './views/public/SubmissionPage';
import AdminDashboard from './views/admin/AdminDashboard';

function MissingLink() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
      <div>
        <h1 style={{ fontSize: 20, marginBottom: 8 }}>Submission link required</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          Open the submit link shared with you (it looks like <code>/submit/&lt;ref&gt;</code>).
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/submit/:ref" element={<SubmissionPage />} />
      <Route path="/admin/:ref" element={<AdminDashboard />} />
      <Route path="*" element={<MissingLink />} />
    </Routes>
  );
}
