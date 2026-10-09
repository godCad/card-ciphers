import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  digitsOnly,
  isTerminal,
  type GiftCardSubmission,
  type SubmissionStats,
} from '../models/giftCardSubmission';
import { deleteCard, getAdmin, updateCard } from '../api/client';

const PAGE_SIZE = 10;

// 'confirm' moves a pending card to confirmed; 'edit' only rewrites the amount
export type AmountMode = 'confirm' | 'edit';

export function useAdminViewModel(ref: string) {
  const [adminName, setAdminName] = useState('');
  const [submissions, setSubmissions] = useState<GiftCardSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearchState] = useState('');
  const [page, setPage] = useState(1);
  const [confirmTargetId, setConfirmTargetId] = useState<string | null>(null);
  const [amountMode, setAmountMode] = useState<AmountMode>('confirm');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { name, submissions: rows } = await getAdmin(ref);
      setAdminName(name);
      setSubmissions(rows);
    } catch {
      setError('Unable to load this dashboard. Check the link and that the server is running.');
    } finally {
      setLoading(false);
    }
  }, [ref]);

  useEffect(() => {
    void load();
  }, [load]);

  function setSearch(value: string) {
    setSearchState(value);
    setPage(1);
  }

  const stats = useMemo<SubmissionStats>(
    () => ({
      totalSubmitted: submissions.length,
      pendingReview: submissions.filter((s) => s.status === 'pending').length,
      confirmed: submissions.filter((s) => s.status === 'confirmed').length,
      declined: submissions.filter((s) => s.status === 'declined').length,
    }),
    [submissions],
  );

  const filtered = useMemo(() => {
    const query = digitsOnly(search);
    if (!query) return submissions;
    return submissions.filter((s) => digitsOnly(s.cardNumber).includes(query));
  }, [submissions, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // keep the current page in range when filtering shrinks the result set
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  const rangeLabel =
    filtered.length === 0
      ? 'Showing 0 of 0'
      : `Showing ${start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)} of ${filtered.length}`;

  // confirming needs an amount, so open the modal instead of finalizing right away
  function confirm(id: string) {
    const target = submissions.find((s) => s.id === id);
    if (!target || isTerminal(target.status)) return;
    setAmountMode('confirm');
    setConfirmTargetId(id);
  }

  // reopen the same modal on an already-confirmed card to correct its amount
  function editAmount(id: string) {
    const target = submissions.find((s) => s.id === id);
    if (!target || target.status !== 'confirmed') return;
    setAmountMode('edit');
    setConfirmTargetId(id);
  }

  function cancelConfirm() {
    setConfirmTargetId(null);
  }

  async function submitConfirm(amount: number) {
    if (confirmTargetId === null) return;
    await updateCard(
      confirmTargetId,
      amountMode === 'edit' ? { amount } : { status: 'confirmed', amount },
    );
    setConfirmTargetId(null);
    await load();
  }

  async function decline(id: string) {
    const target = submissions.find((s) => s.id === id);
    if (!target || isTerminal(target.status)) return;
    await updateCard(id, { status: 'declined' });
    await load();
  }

  // deleting is destructive from the admin's view, so it goes through a confirmation first
  function requestDelete(id: string) {
    const target = submissions.find((s) => s.id === id);
    if (!target) return;
    setDeleteTargetId(id);
  }

  function cancelDelete() {
    setDeleteTargetId(null);
  }

  // soft delete; the reload drops the row because the api stops returning it
  async function confirmDelete() {
    if (deleteTargetId === null) return;
    await deleteCard(deleteTargetId);
    setDeleteTargetId(null);
    await load();
  }

  const confirmTarget =
    confirmTargetId !== null ? submissions.find((s) => s.id === confirmTargetId) ?? null : null;

  const deleteTarget =
    deleteTargetId !== null ? submissions.find((s) => s.id === deleteTargetId) ?? null : null;

  return {
    adminName,
    loading,
    error,
    submissions,
    stats,
    search,
    setSearch,
    page: safePage,
    setPage,
    pageSize: PAGE_SIZE,
    filtered,
    paged,
    totalPages,
    rangeLabel,
    confirm,
    decline,
    editAmount,
    confirmTarget,
    amountMode,
    cancelConfirm,
    submitConfirm,
    requestDelete,
    deleteTarget,
    cancelDelete,
    confirmDelete,
  };
}
