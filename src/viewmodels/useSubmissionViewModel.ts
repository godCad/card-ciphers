import { useState } from 'react';
import { digitsOnly } from '../models/giftCardSubmission';
import { verifyCard } from '../api/client';

export type SubmissionResult = 'idle' | 'loading' | 'pending' | 'confirmed' | 'declined' | 'error';

// group digits into blocks of four for a readable, card-like input
// group alphanumeric characters into blocks of four for a readable, card-like input
function formatCode(value: string): string {
  // Remove anything that is NOT a letter or a number, then limit to 16 characters
  const alphanumeric = value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
  
  // Optional: Convert letters to uppercase automatically (common for gift card codes)
  // const alphanumeric = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 16);

  return alphanumeric.replace(/(.{4})/g, '$1 ').trim();
}

export function useSubmissionViewModel(ref: string) {
  const [code, setCodeState] = useState('');
  const [result, setResult] = useState<SubmissionResult>('idle');
  const [confirmedAmount, setConfirmedAmount] = useState<number | string | undefined>(undefined);
  const [confirmedLast4, setConfirmedLast4] = useState('');

  // 1. Create a shared helper for alphanumeric characters
function alphanumericOnly(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}
  const isValid = alphanumericOnly(code).length === 16;

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
      if (res.result === 'confirmed' || res.result === 'declined') {
        setConfirmedAmount(res.amount);
        setConfirmedLast4(digitsOnly(code).slice(-4));
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
