import React from 'react';
import styles from './Badge.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeType = 'dot' | 'count' | 'new';

export interface BadgeProps {
  /** Visual type of the badge */
  type?: BadgeType;
  /** Number shown for type="count". Displays "99+" when > 99. */
  count?: number;
  /** Inverted colour scheme — white background, orange text. Use on coloured surfaces. */
  inversed?: boolean;
  className?: string;
}

// ─── Badge ────────────────────────────────────────────────────────────────────

export const Badge: React.FC<BadgeProps> = ({
  type = 'dot',
  count = 0,
  inversed = false,
  className = '',
}) => {
  const inversedCls = inversed ? styles.inversed : '';

  if (type === 'dot') {
    return (
      <span className={[styles.badge, styles.dot, inversedCls, className].filter(Boolean).join(' ')} />
    );
  }

  if (type === 'count') {
    const label = count > 99 ? '99+' : String(count);
    return (
      <span className={[styles.badge, styles.count, inversedCls, className].filter(Boolean).join(' ')}>
        {label}
      </span>
    );
  }

  // type === 'new'
  return (
    <span className={[styles.badge, styles.new, inversedCls, className].filter(Boolean).join(' ')}>
      New
    </span>
  );
};
