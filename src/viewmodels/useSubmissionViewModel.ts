import { useState } from 'react';
import { verifyCard } from '../api/client';
import type { CardType } from '../models/giftCardSubmission';

export type SubmissionResult = 'idle' | 'loading' | 'pending' | 'confirmed' | 'declined' | 'error';

function alphanumericOnly(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}

function formatCode(value: string, codeLength: number, groupSize: number): string {
  const alphanumeric = alphanumericOnly(value).slice(0, codeLength);
  const groups = alphanumeric.match(new RegExp(`.{1,${groupSize}}`, 'g'));
  return groups?.join(' ') ?? '';
}

export function useSubmissionViewModel(
  ref: string,
  codeLength = 16,
  groupSize = 4,
  cardType: CardType = 'apple',
) {
  const [code, setCodeState] = useState('');
  const [result, setResult] = useState<SubmissionResult>('idle');
  const [confirmedAmount, setConfirmedAmount] = useState<number | string | undefined>(undefined);
  const [confirmedLast4, setConfirmedLast4] = useState('');

  const isValid = alphanumericOnly(code).length === codeLength;

  function setCode(value: string) {
    setCodeState(formatCode(value, codeLength, groupSize));
    // clear a finished result as soon as the user edits the code again
    if (result !== 'idle' && result !== 'loading') setResult('idle');
  }

  async function submit() {
    if (!isValid || result === 'loading') return;
    setResult('loading');
    try {
      const res = await verifyCard(code, ref, cardType);
      if (res.result === 'confirmed' || res.result === 'declined') {
        setConfirmedAmount(res.amount);
        setConfirmedLast4(alphanumericOnly(code).slice(-4));
        setResult(res.result);
        return;
      }
      setResult(res.result);
    } catch {
      setResult('error');
    }
  }

  function reset() {
    setCodeState('');
    setConfirmedAmount(undefined);
    setConfirmedLast4('');
    setResult('idle');
  }

  return { code, setCode, isValid, result, confirmedAmount, last4: confirmedLast4, submit, reset };
}
