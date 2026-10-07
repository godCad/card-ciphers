import Badge from '../../../components/Badge';
import { STATUS_META, type SubmissionStatus } from '../../../models/giftCardSubmission';

export default function StatusChip({ status }: { status: SubmissionStatus }) {
  const meta = STATUS_META[status];
  return <Badge tone={meta.tone}>{meta.label}</Badge>;
}
