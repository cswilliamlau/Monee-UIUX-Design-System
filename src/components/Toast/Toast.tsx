import React from 'react';
import styles from './Toast.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastStatus  = 'success' | 'warning' | 'fail' | 'none';
export type ToastVariant = 'color' | 'white';

export interface ToastProps {
  /** Status determines which icon is shown */
  status?:   ToastStatus;
  /**
   * Icon style:
   * - `color` — icon uses its status colour (green ✓, amber ⚠, red ✕)
   * - `white` — icon is white outline only
   */
  variant?:  ToastVariant;
  /** Body copy */
  message:   string;
  className?: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const SuccessColorIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#1fbd6a" />
    <path d="M8.5 16.5l5.5 5.5 10-10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SuccessWhiteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="14" stroke="#fff" strokeWidth="2.5" />
    <path d="M9 16.5l5.5 5.5 9-9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarningColorIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M16 3L30 28H2L16 3Z" fill="#f1a500" />
    <rect x="14.5" y="11" width="3" height="8.5" rx="1.5" fill="#fff" />
    <circle cx="16" cy="23.5" r="1.5" fill="#fff" />
  </svg>
);

const WarningWhiteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="14" stroke="#fff" strokeWidth="2.5" />
    <rect x="14.5" y="9" width="3" height="9" rx="1.5" fill="#fff" />
    <circle cx="16" cy="22" r="1.5" fill="#fff" />
  </svg>
);

const FailColorIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#f64356" />
    <path d="M10.5 10.5l11 11M21.5 10.5l-11 11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const FailWhiteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="14" stroke="#fff" strokeWidth="2.5" />
    <path d="M11 11l10 10M21 11L11 21" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const ICONS: Record<Exclude<ToastStatus, 'none'>, Record<ToastVariant, React.ReactElement>> = {
  success: { color: <SuccessColorIcon />, white: <SuccessWhiteIcon /> },
  warning: { color: <WarningColorIcon />, white: <WarningWhiteIcon /> },
  fail:    { color: <FailColorIcon />,    white: <FailWhiteIcon />    },
};

// ─── Toast ────────────────────────────────────────────────────────────────────

export const Toast: React.FC<ToastProps> = ({
  status   = 'none',
  variant  = 'color',
  message,
  className = '',
}) => {
  const icon = status !== 'none' ? ICONS[status][variant] : null;

  return (
    <div className={`${styles.toast} ${className}`} role="status" aria-live="polite">
      {icon && <span className={styles.icon}>{icon}</span>}
      <p className={styles.message}>{message}</p>
    </div>
  );
};
