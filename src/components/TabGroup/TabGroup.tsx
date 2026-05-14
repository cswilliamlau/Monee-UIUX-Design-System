import React from 'react';
import styles from './TabGroup.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TabGroupVariant = 'default' | 'scrollable-hug' | 'scrollable-fix';
export type TabGroupSize    = 'normal' | 'small';

export interface TabItem {
  key:   string;
  label: string;
}

export interface TabGroupProps {
  items:      TabItem[];
  activeKey:  string;
  onChange?:  (key: string) => void;
  /**
   * - `default`         — tabs fill full width equally
   * - `scrollable-hug`  — each tab hugs its label width, bar scrolls
   * - `scrollable-fix`  — each tab has a fixed pixel width, bar scrolls
   *                        (set `tabWidth` to control; defaults to 120px)
   */
  variant?:   TabGroupVariant;
  /** `normal` = 52 px tall (in-page), `small` = 42 px tall (in-module) */
  size?:      TabGroupSize;
  /** Width per tab for `scrollable-fix` variant (px). Default 120. */
  tabWidth?:  number;
  className?: string;
}

// ─── TabGroup ─────────────────────────────────────────────────────────────────

export const TabGroup: React.FC<TabGroupProps> = ({
  items,
  activeKey,
  onChange,
  variant   = 'default',
  size      = 'normal',
  tabWidth  = 120,
  className = '',
}) => {
  const variantClass =
    variant === 'scrollable-hug' ? styles.scrollableHug :
    variant === 'scrollable-fix' ? styles.scrollableFix :
    styles.default;

  const sizeClass = size === 'small' ? styles.sizeSmall : styles.sizeNormal;

  const cls = [styles.tabGroup, variantClass, sizeClass, className]
    .filter(Boolean).join(' ');

  return (
    <div className={cls} role="tablist">
      {items.map((item) => {
        const active = item.key === activeKey;
        const tabCls = [styles.tab, active ? styles.active : ''].filter(Boolean).join(' ');

        return (
          <button
            key={item.key}
            role="tab"
            aria-selected={active}
            className={tabCls}
            onClick={() => onChange?.(item.key)}
            style={variant === 'scrollable-fix' ? { width: tabWidth, flexShrink: 0 } : undefined}
          >
            <span className={styles.labelWrap}>
              <span className={styles.label}>{item.label}</span>
              {active && <span className={styles.indicator} />}
            </span>
          </button>
        );
      })}
    </div>
  );
};
