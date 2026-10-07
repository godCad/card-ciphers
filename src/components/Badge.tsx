import type { ReactNode } from 'react';
import type { StatusTone } from '../models/giftCardSubmission';
import styles from './Badge.module.css';

interface BadgeProps {
  tone: StatusTone;
  children: ReactNode;
}

export default function Badge({ tone, children }: BadgeProps) {
  return <span className={[styles.badge, styles[tone]].join(' ')}>{children}</span>;
}
