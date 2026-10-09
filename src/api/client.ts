import type { GiftCardSubmission, SubmissionStatus } from '../models/giftCardSubmission';

const BASE = '/api';

async function http<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

interface ApiCard {
  _id: string;
  admin_id: string;
  number: string;
  amount?: number;
  status: SubmissionStatus;
  createdAt: string;
}

interface AdminResponse {
  _id: string;
  name: string;
  ref: string;
  cards: ApiCard[];
}

// adapt a db card document to the shape the views already use
function toSubmission(card: ApiCard): GiftCardSubmission {
  return {
    id: card._id,
    cardNumber: card.number,
    submittedAt: card.createdAt,
    status: card.status,
    amount: card.amount,
  };
}

export async function getAdmin(ref: string): Promise<{ name: string; submissions: GiftCardSubmission[] }> {
  const data = await http<AdminResponse>(`/admins/${ref}`);
  return { name: data.name, submissions: data.cards.map(toSubmission) };
}

// status is optional so an amount can be edited without re-sending the card's status
export async function updateCard(
  id: string,
  payload: { status?: SubmissionStatus; amount?: number },
): Promise<void> {
  await http(`/cards/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
}

export async function deleteCard(id: string): Promise<void> {
  await http(`/cards/${id}`, { method: 'DELETE' });
}

export type VerifyResult =
  | { result: 'pending' }
  | { result: 'declined' }
  | { result: 'confirmed'; amount?: number };

export async function verifyCard(number: string, ref: string): Promise<VerifyResult> {
  console.log('verifyCard', number, ref);
  return http<VerifyResult>('/cards/verify', {
    method: 'POST',
    body: JSON.stringify({ number, ref }),
  });
}
