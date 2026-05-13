import React from 'react';
import styles from './Tips.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TipsStatus =
  | 'info'       // light-blue background
  | 'info-grey'  // neutral-grey background
  | 'warning'
  | 'error'
  | 'success'
  | 'shopee'
  | 'bank';

export type TipsMode   = 'full-width' | 'card';
export type TipsAction = 'arrow' | 'close' | 'button' | 'none';

export interface TipsProps {
  /** Semantic colour of the tip */
  status?: TipsStatus;
  /** full-width: no border-radius (edge-to-edge). card: rounded (embedded inside a container). */
  mode?: TipsMode;
  /** Adds a 1px coloured border that matches the status */
  outlined?: boolean;
  /** Optional bold title above the content text */
  title?: string;
  /** Body text (required) */
  content: string;
  /** Right-side action control */
  action?: TipsAction;
  /** Label for action="button" */
  actionLabel?: string;
  /** Called when the action is pressed */
  onAction?: () => void;
  className?: string;
}

// ─── Status icons ─────────────────────────────────────────────────────────────

const INFO_COLOR    = '#1c64f0';
const WARNING_COLOR = '#f1a500';
const ERROR_COLOR   = '#f64356';
const SUCCESS_COLOR = '#1fbd6a';
const SHOPEE_COLOR  = '#ee4d2d';
const BANK_COLOR    = '#fa5e00';

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill={INFO_COLOR} />
    <text x="10" y="15" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">i</text>
  </svg>
);
const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2 L18.66 17 H1.34 Z" fill={WARNING_COLOR} />
    <text x="10" y="15.5" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">!</text>
  </svg>
);
const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill={ERROR_COLOR} />
    <text x="10" y="15" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">!</text>
  </svg>
);
const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill={SUCCESS_COLOR} />
    <polyline points="5,10 8.5,13.5 15,7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ShopeeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill={SHOPEE_COLOR} />
    <text x="10" y="15" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">S</text>
  </svg>
);
const BankIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill={BANK_COLOR} />
    <text x="10" y="15" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">B</text>
  </svg>
);

const STATUS_ICON: Record<TipsStatus, React.ReactElement> = {
  'info':      <InfoIcon />,
  'info-grey': <InfoIcon />,
  'warning':   <WarningIcon />,
  'error':     <ErrorIcon />,
  'success':   <SuccessIcon />,
  'shopee':    <ShopeeIcon />,
  'bank':      <BankIcon />,
};

// ─── Arrow / Close icons ──────────────────────────────────────────────────────

const ArrowIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5 3l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CloseIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 3l8 8M11 3l-8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ACTION_COLOR: Record<TipsStatus, string> = {
  'info':      INFO_COLOR,
  'info-grey': INFO_COLOR,
  'warning':   WARNING_COLOR,
  'error':     ERROR_COLOR,
  'success':   SUCCESS_COLOR,
  'shopee':    SHOPEE_COLOR,
  'bank':      BANK_COLOR,
};

// ─── Tips ─────────────────────────────────────────────────────────────────────

export const Tips: React.FC<TipsProps> = ({
  status    = 'info',
  mode      = 'full-width',
  outlined  = false,
  title,
  content,
  action    = 'none',
  actionLabel = 'Action',
  onAction,
  className = '',
}) => {
  const cls = [
    styles.tips,
    styles[mode],
    styles[`status-${status}`],
    outlined ? styles.outlined : '',
    className,
  ].filter(Boolean).join(' ');

  const color = ACTION_COLOR[status];

  return (
    <div className={cls}>
      <span className={styles.icon}>{STATUS_ICON[status]}</span>

      <div className={styles.body}>
        {title && <span className={styles.title}>{title}</span>}
        <span className={styles.content}>{content}</span>
      </div>

      {action !== 'none' && (
        <span className={styles.action}>
          {action === 'arrow'  && <ArrowIcon color={color} />}
          {action === 'close'  && <CloseIcon color={color} />}
          {action === 'button' && (
            <button className={styles.actionBtn} onClick={onAction}>
              {actionLabel}
            </button>
          )}
        </span>
      )}
    </div>
  );
};
