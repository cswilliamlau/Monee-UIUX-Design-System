import React from 'react';
import styles from './BottomNav.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BottomNavItem {
  key:         string;
  label:       string;
  /** Icon shown when unselected */
  icon:        React.ReactNode;
  /** Icon shown when selected — if omitted the same icon renders in orange */
  activeIcon?: React.ReactNode;
  /** true → small red dot, number → red pill with count */
  badge?:      number | boolean;
}

export interface BottomNavProps {
  items:     BottomNavItem[];
  activeKey: string;
  onSelect?: (key: string) => void;
  /**
   * Inserts a raised QR scan button in the centre slot.
   * Pass 4 items (2 left + 2 right) for the canonical 5-slot layout.
   */
  showScan?: boolean;
  scanLabel?: string;
  onScan?:   () => void;
  className?: string;
}

// ─── Scan QR icon ─────────────────────────────────────────────────────────────

const QRIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3"  y="3"  width="7" height="7" rx="1" stroke="white" strokeWidth="1.8"/>
    <rect x="14" y="3"  width="7" height="7" rx="1" stroke="white" strokeWidth="1.8"/>
    <rect x="3"  y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="1.8"/>
    <rect x="5"  y="5"  width="3" height="3" fill="white"/>
    <rect x="16" y="5"  width="3" height="3" fill="white"/>
    <rect x="5"  y="16" width="3" height="3" fill="white"/>
    <path d="M14 14h3M14 17h2M14 20h3M17 17v3M20 14v3M20 20h-3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// ─── Badge ────────────────────────────────────────────────────────────────────

const Badge: React.FC<{ value: number | boolean }> = ({ value }) => {
  if (value === false) return null;
  if (value === true)  return <span className={styles.dot} />;
  return <span className={styles.pill}>{value > 99 ? '99+' : value}</span>;
};

// ─── BottomNav ────────────────────────────────────────────────────────────────

export const BottomNav: React.FC<BottomNavProps> = ({
  items,
  activeKey,
  onSelect,
  showScan  = false,
  scanLabel = 'QRIS',
  onScan,
  className = '',
}) => {
  // When showScan, split items into left/right halves; scan goes in the middle
  const mid        = Math.floor(items.length / 2);
  const leftItems  = showScan ? items.slice(0, mid)  : items;
  const rightItems = showScan ? items.slice(mid)      : [];

  const renderItem = (item: BottomNavItem) => {
    const active = item.key === activeKey;
    return (
      <button
        key={item.key}
        className={`${styles.item} ${active ? styles.active : ''}`}
        onClick={() => onSelect?.(item.key)}
        aria-current={active ? 'page' : undefined}
      >
        <span className={styles.iconWrap}>
          {active && item.activeIcon ? item.activeIcon : item.icon}
          {item.badge !== undefined && <Badge value={item.badge} />}
        </span>
        <span className={styles.label}>{item.label}</span>
      </button>
    );
  };

  return (
    <div
      className={`${styles.wrap} ${showScan ? styles.hasScan : ''} ${className}`}
    >
      {showScan && (
        <button className={styles.scanCircle} onClick={onScan} aria-label="Scan QR code">
          <QRIcon />
        </button>
      )}

      <div className={styles.bar}>
        {showScan ? (
          <>
            {leftItems.map(renderItem)}
            {/* centre placeholder that holds the QRIS label under the scan button */}
            <div className={styles.scanSlot}>
              <span className={styles.label}>{scanLabel}</span>
            </div>
            {rightItems.map(renderItem)}
          </>
        ) : (
          items.map(renderItem)
        )}
      </div>
    </div>
  );
};
