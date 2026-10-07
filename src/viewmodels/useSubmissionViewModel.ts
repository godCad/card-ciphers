import { useState } from 'react';
import { digitsOnly } from '../models/giftCardSubmission';
import { verifyCard } from '../api/client';

export type SubmissionResult = 'idle' | 'loading' | 'pending' | 'confirmed' | 'declined' | 'error';

// group digits into blocks of four for a readable, card-like input
function formatCode(value: string): string {
  const digits = digitsOnly(value).slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

export function useSubmissionViewModel(ref: string) {
  const [code, setCodeState] = useState('');
  const [result, setResult] = useState<SubmissionResult>('idle');
  const [confirmedAmount, setConfirmedAmount] = useState<number | undefined>(undefined);
  const [confirmedLast4, setConfirmedLast4] = useState('');

  const isValid = digitsOnly(code).length === 16;

  function setCode(value: string) {
    setCodeState(formatCode(value));
    // clear a finished result as soon as the user edits the code again
    if (result !== 'idle' && result !== 'loading') setResult('idle');
  }

  async function submit() {
    if (!isValid || result === 'loading') return;
    setResult('loading');
    try {
      const res = await verifyCard(code, ref);
      if (res.result === 'confirmed') {
        setConfirmedAmount(res.amount);
        setConfirmedLast4(digitsOnly(code).slice(-4));
        setResult('confirmed');
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
