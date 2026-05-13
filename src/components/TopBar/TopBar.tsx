import React from 'react';
import styles from './TopBar.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TopBarType    = 'default' | 'search' | 'subtitle' | 'image' | 'homepage';
export type TopBarBgColor = 'white' | 'orange' | 'transparent';

export interface TopBarProps {
  type?:               TopBarType;
  /** Background — applies to the whole bar */
  bgColor?:            TopBarBgColor;
  showShadow?:         boolean;
  /** Show `‹` back arrow on the left */
  showBack?:           boolean;
  onBack?:             () => void;
  title?:              string;
  /** Subtitle body copy — `subtitle` type only */
  subtitle?:           string;
  /** Anything you want on the right edge (icon buttons, text button, etc.) */
  rightSlot?:          React.ReactNode;
  /** `search` type only */
  searchPlaceholder?:  string;
  /** `homepage` type */
  userName?:           string;
  accountNumber?:      string;
  /** Show dropdown chevron next to name */
  multiAccount?:       boolean;
  notificationCount?:  number;
  showStatusBar?:      boolean;
  time?:               string;
  className?:          string;
}

// ─── Internal SVG icons ───────────────────────────────────────────────────────

const BackArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const CameraIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="1" y="4.5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="10" cy="10.5" r="3" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M7 4.5l1.5-2.5h3l1.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <rect x="4.5" y="4.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M10.5 4.5V3A1.5 1.5 0 009 1.5H3A1.5 1.5 0 001.5 3v6A1.5 1.5 0 003 10.5h1.5" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
);

const BellIcon: React.FC<{ count?: number }> = ({ count }) => (
  <div style={{ position: 'relative', display: 'inline-flex' }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    {count !== undefined && count > 0 && (
      <span className={styles.badge}>{count > 9 ? '9+' : count}</span>
    )}
  </div>
);

// Status bar — decorative mobile chrome
const WifiSvg = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
    <circle cx="8" cy="10.5" r="1.5"/>
    <path d="M5.3 7.2A3.8 3.8 0 018 6.1c1.05 0 2 .4 2.7 1.1l1-1A5.3 5.3 0 008 4.5a5.3 5.3 0 00-3.7 1.7l1 1z"/>
    <path d="M2.6 4.5A7.6 7.6 0 018 2.2c2.1 0 4 .9 5.4 2.3l1-1A9.1 9.1 0 008 .6 9.1 9.1 0 001.6 3.5l1 1z"/>
  </svg>
);

const SignalSvg = () => (
  <svg width="15" height="12" viewBox="0 0 15 12" fill="currentColor" aria-hidden="true">
    <rect x="0"    y="9"   width="2.5" height="3"    rx="0.5"/>
    <rect x="3"    y="6.5" width="2.5" height="5.5"  rx="0.5"/>
    <rect x="6"    y="4"   width="2.5" height="8"    rx="0.5"/>
    <rect x="9"    y="1.5" width="2.5" height="10.5" rx="0.5"/>
    <rect x="12"   y="0"   width="2.5" height="12"   rx="0.5"/>
  </svg>
);

const BatterySvg = () => (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
    <rect x="0.5" y="1.5" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1"/>
    <rect x="1.5" y="2.5" width="8"  height="7" rx="0.8" fill="currentColor"/>
    <path d="M11.5 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ─── Status bar ───────────────────────────────────────────────────────────────

const StatusBar: React.FC<{ time: string }> = ({ time }) => (
  <div className={styles.statusBar}>
    <div className={styles.statusRight}>
      <WifiSvg />
      <SignalSvg />
      <BatterySvg />
      <span className={styles.statusTime}>{time}</span>
    </div>
  </div>
);

// ─── TopBar ───────────────────────────────────────────────────────────────────

export const TopBar: React.FC<TopBarProps> = ({
  type              = 'default',
  bgColor           = 'white',
  showShadow        = false,
  showBack          = true,
  onBack,
  title             = 'Page Title',
  subtitle,
  rightSlot,
  searchPlaceholder = 'Placeholder Text',
  userName          = 'A User Name Here',
  accountNumber     = '2000 2088 4000',
  multiAccount      = false,
  notificationCount,
  showStatusBar     = true,
  time              = '12:30',
  className         = '',
}) => {
  const bgClass = bgColor === 'white'       ? styles.bgWhite
                : bgColor === 'orange'      ? styles.bgOrange
                : /* transparent */           styles.bgTransparent;

  const cls = [
    styles.topBar,
    bgClass,
    showShadow ? styles.shadow : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {showStatusBar && <StatusBar time={time} />}

      {/* ── default / image ── */}
      {(type === 'default' || type === 'image') && (
        <div className={styles.mainBar}>
          <div className={styles.left}>
            {showBack && (
              <button className={styles.iconBtn} onClick={onBack} aria-label="Go back">
                <BackArrow />
              </button>
            )}
            {title && <span className={styles.title}>{title}</span>}
          </div>
          {rightSlot && <div className={styles.right}>{rightSlot}</div>}
        </div>
      )}

      {/* ── search ── */}
      {type === 'search' && (
        <div className={styles.mainBar}>
          {showBack && (
            <button className={styles.iconBtn} onClick={onBack} aria-label="Go back">
              <BackArrow />
            </button>
          )}
          <div className={styles.searchWrap}>
            <span className={styles.searchAdorn}><SearchIcon /></span>
            <span className={styles.searchPlaceholder}>{searchPlaceholder}</span>
            <span className={styles.searchAdorn}><CameraIcon /></span>
          </div>
          {rightSlot && <div className={styles.right}>{rightSlot}</div>}
        </div>
      )}

      {/* ── subtitle ── */}
      {type === 'subtitle' && (
        <div className={styles.subtitleBar}>
          {showBack && (
            <button className={styles.iconBtn} onClick={onBack} aria-label="Go back">
              <BackArrow />
            </button>
          )}
          <h1 className={styles.subtitleTitle}>{title}</h1>
          {subtitle && <p className={styles.subtitleText}>{subtitle}</p>}
        </div>
      )}

      {/* ── homepage ── */}
      {type === 'homepage' && (
        <div className={styles.mainBar}>
          <div className={styles.homepageLeft}>
            <div className={styles.avatar} aria-hidden="true">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="18" fill="#ee4d2d"/>
                <circle cx="18" cy="14" r="6" fill="white"/>
                <path d="M6 32c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="white"/>
              </svg>
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>
                <span>{userName}</span>
                {multiAccount && <ChevronDown />}
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountNumber}>Account No: {accountNumber}</span>
                <button className={styles.iconBtnSm} aria-label="Copy account number">
                  <CopyIcon />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <BellIcon count={notificationCount} />
          </div>
        </div>
      )}
    </div>
  );
};
