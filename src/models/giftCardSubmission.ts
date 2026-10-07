export type SubmissionStatus = 'pending' | 'needs_review' | 'confirmed' | 'declined';

export type StatusTone = 'amber' | 'purple' | 'green' | 'red';

export interface GiftCardSubmission {
  id: string;
  cardNumber: string;
  submittedAt: string;
  status: SubmissionStatus;
  amount?: number;
  reviewedAt?: string;
  reviewedBy?: string;
  note?: string;
}

export interface SubmissionStats {
  totalSubmitted: number;
  pendingReview: number;
  confirmed: number;
  declined: number;
}

export const STATUS_META: Record<SubmissionStatus, { label: string; tone: StatusTone }> = {
  pending: { label: 'Pending', tone: 'amber' },
  needs_review: { label: 'Needs Review', tone: 'purple' },
  confirmed: { label: 'Confirmed', tone: 'green' },
  declined: { label: 'Declined', tone: 'red' },
};

// strip to digits so masking and duplicate checks ignore spacing differences
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

// show only the last 4 digits; the full code is a bearer secret and never fully rendered
export function maskCardNumber(cardNumber: string): string {
  const last4 = digitsOnly(cardNumber).slice(-4);
  return `•••• •••• ${last4}`;
}

export function formatSubmittedAt(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

// confirmed and declined are final; no further transitions are allowed
export function isTerminal(status: SubmissionStatus): boolean {
  return status === 'confirmed' || status === 'declined';
}

// show a dash when no amount has been set yet (only confirmed cards carry one)
export function formatAmount(amount?: number): string {
  if (amount == null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
