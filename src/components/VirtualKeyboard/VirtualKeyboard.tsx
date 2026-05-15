import React, { useState } from 'react';
import styles from './VirtualKeyboard.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type VirtualKeyboardType    = 'pin' | 'transfer' | 'password' | 'login';
export type TransferSpecialKey     = 'dot' | '00' | '000';
export type LoginBiometricType     = 'face-id' | 'touch-id' | 'none';

export interface VirtualKeyboardProps {
  type:              VirtualKeyboardType;
  /** Called for every printable key (digits, letters, symbols, space) */
  onKey?:            (key: string) => void;
  onDelete?:         () => void;
  /** Transfer: confirm button */
  onDone?:           () => void;
  /** Login: biometric button */
  onBiometric?:      () => void;
  /** Transfer keyboard — which shortcut key to show. Default `'dot'` */
  transferSpecial?:  TransferSpecialKey;
  /** Login keyboard — which biometric icon to show. Default `'face-id'` */
  loginBiometric?:   LoginBiometricType;
  className?:        string;
}

// ─── SVG icons ────────────────────────────────────────────────────────────────

const DeleteIcon = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
    <path d="M8 1H20a1 1 0 011 1v12a1 1 0 01-1 1H8l-7-7 7-7z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 5.5l5 5M17 5.5l-5 5"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FaceIDIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="1.5" y="1.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="18.5" y="1.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="1.5" y="18.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="18.5" y="18.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="10.5" cy="11.5" r="1.5" fill="currentColor"/>
    <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor"/>
    <path d="M10 17.5s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const TouchIDIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 4a10 10 0 100 20A10 10 0 0014 4z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M14 9a5 5 0 00-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 9a5 5 0 015 5c0 3-2 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 12v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ShiftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 2L1.5 9.5H6V16h6V9.5h4.5L9 2z"
      stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
  </svg>
);

// ─── Shared key button ────────────────────────────────────────────────────────

interface KeyBtnProps {
  label:     React.ReactNode;
  onClick:   () => void;
  variant?:  'default' | 'action' | 'done' | 'blank' | 'login';
  className?: string;
}

const KeyBtn: React.FC<KeyBtnProps> = ({ label, onClick, variant = 'default', className = '' }) => (
  <button
    type="button"
    className={`${styles.key} ${styles[`key_${variant}`]} ${className}`}
    onClick={onClick}
  >
    {label}
  </button>
);

// ─── PIN keyboard ─────────────────────────────────────────────────────────────

const PINKeyboard: React.FC<{ onKey?: (k: string) => void; onDelete?: () => void }> = ({
  onKey, onDelete,
}) => (
  <div className={`${styles.grid3} ${styles.pinGrid}`}>
    {['1','2','3','4','5','6','7','8','9'].map((k) => (
      <KeyBtn key={k} label={k} onClick={() => onKey?.(k)} />
    ))}
    <KeyBtn label="" onClick={() => {}} variant="blank" />
    <KeyBtn label="0" onClick={() => onKey?.('0')} />
    <KeyBtn label={<DeleteIcon />} onClick={() => onDelete?.()} variant="action" />
  </div>
);

// ─── Transfer keyboard ────────────────────────────────────────────────────────

const TransferKeyboard: React.FC<{
  onKey?:    (k: string) => void;
  onDelete?: () => void;
  onDone?:   () => void;
  special:   TransferSpecialKey;
}> = ({ onKey, onDelete, onDone, special }) => {
  const specialLabel = special === 'dot' ? '.' : special === '00' ? '00' : '000';
  return (
    <div className={styles.transferGrid}>
      {/* Row 1 */}
      <KeyBtn label="1" onClick={() => onKey?.('1')} />
      <KeyBtn label="2" onClick={() => onKey?.('2')} />
      <KeyBtn label="3" onClick={() => onKey?.('3')} />
      <KeyBtn label={<DeleteIcon />} onClick={() => onDelete?.()} variant="action"
        className={styles.transferDelete} />

      {/* Row 2 */}
      <KeyBtn label="4" onClick={() => onKey?.('4')} />
      <KeyBtn label="5" onClick={() => onKey?.('5')} />
      <KeyBtn label="6" onClick={() => onKey?.('6')} />

      {/* Done button spans rows 2-4 col 4 */}
      <button
        type="button"
        className={`${styles.key} ${styles.transferDone}`}
        onClick={() => onDone?.()}
      >
        Done
      </button>

      {/* Row 3 */}
      <KeyBtn label="7" onClick={() => onKey?.('7')} />
      <KeyBtn label="8" onClick={() => onKey?.('8')} />
      <KeyBtn label="9" onClick={() => onKey?.('9')} />

      {/* Row 4 */}
      <KeyBtn label="" onClick={() => {}} variant="blank" />
      <KeyBtn label="0" onClick={() => onKey?.('0')} />
      <KeyBtn label={specialLabel} onClick={() => onKey?.(specialLabel)} />
    </div>
  );
};

// ─── Password keyboard ────────────────────────────────────────────────────────

const QWERTY = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
const NUM_ROW1 = ['1','2','3','4','5','6','7','8','9','0'];
const NUM_ROW2 = ['-','/',':', ';','(',')', '$','&','@','"'];
const NUM_ROW3 = ['.', ',', '?', '!', "'"];

const PasswordKeyboard: React.FC<{
  onKey?:    (k: string) => void;
  onDelete?: () => void;
  onDone?:   () => void;
}> = ({ onKey, onDelete, onDone }) => {
  const [mode,    setMode]    = useState<'abc' | '123'>('abc');
  const [shifted, setShifted] = useState(false);

  const fire = (k: string) => {
    onKey?.(shifted ? k.toUpperCase() : k);
    if (shifted) setShifted(false); // one-shot shift
  };

  if (mode === 'abc') {
    return (
      <div className={styles.pwWrap}>
        {/* Row 1 — 10 keys */}
        <div className={styles.pwRow}>
          {QWERTY[0].split('').map((k) => (
            <KeyBtn key={k} label={shifted ? k.toUpperCase() : k} onClick={() => fire(k)} className={styles.pwKey} />
          ))}
        </div>
        {/* Row 2 — 9 keys */}
        <div className={styles.pwRow}>
          {QWERTY[1].split('').map((k) => (
            <KeyBtn key={k} label={shifted ? k.toUpperCase() : k} onClick={() => fire(k)} className={styles.pwKey} />
          ))}
        </div>
        {/* Row 3 — shift + 7 keys + delete */}
        <div className={styles.pwRow}>
          <KeyBtn label={<ShiftIcon />} onClick={() => setShifted((s) => !s)}
            variant="action" className={`${styles.pwKey} ${styles.pwWide} ${shifted ? styles.pwShiftActive : ''}`} />
          {QWERTY[2].split('').map((k) => (
            <KeyBtn key={k} label={shifted ? k.toUpperCase() : k} onClick={() => fire(k)} className={styles.pwKey} />
          ))}
          <KeyBtn label={<DeleteIcon />} onClick={() => onDelete?.()} variant="action"
            className={`${styles.pwKey} ${styles.pwWide}`} />
        </div>
        {/* Row 4 — mode + space + done */}
        <div className={styles.pwRow}>
          <KeyBtn label="123" onClick={() => setMode('123')} variant="action"
            className={`${styles.pwKey} ${styles.pwMode}`} />
          <KeyBtn label="Space" onClick={() => onKey?.(' ')} variant="action"
            className={styles.pwSpace} />
          <KeyBtn label="Done" onClick={() => onDone?.()} variant="action"
            className={`${styles.pwKey} ${styles.pwMode}`} />
        </div>
      </div>
    );
  }

  // 123 mode
  return (
    <div className={styles.pwWrap}>
      <div className={styles.pwRow}>
        {NUM_ROW1.map((k) => (
          <KeyBtn key={k} label={k} onClick={() => onKey?.(k)} className={styles.pwKey} />
        ))}
      </div>
      <div className={styles.pwRow}>
        {NUM_ROW2.map((k) => (
          <KeyBtn key={k} label={k} onClick={() => onKey?.(k)} className={styles.pwKey} />
        ))}
      </div>
      <div className={styles.pwRow}>
        <KeyBtn label="#+=" onClick={() => {}} variant="action"
          className={`${styles.pwKey} ${styles.pwWide}`} />
        {NUM_ROW3.map((k) => (
          <KeyBtn key={k} label={k} onClick={() => onKey?.(k)} className={styles.pwKey} />
        ))}
        <KeyBtn label={<DeleteIcon />} onClick={() => onDelete?.()} variant="action"
          className={`${styles.pwKey} ${styles.pwWide}`} />
      </div>
      <div className={styles.pwRow}>
        <KeyBtn label="ABC" onClick={() => setMode('abc')} variant="action"
          className={`${styles.pwKey} ${styles.pwMode}`} />
        <KeyBtn label="Space" onClick={() => onKey?.(' ')} variant="action"
          className={styles.pwSpace} />
        <KeyBtn label="Done" onClick={() => onDone?.()} variant="action"
          className={`${styles.pwKey} ${styles.pwMode}`} />
      </div>
    </div>
  );
};

// ─── Login keyboard ───────────────────────────────────────────────────────────

const LoginKeyboard: React.FC<{
  onKey?:       (k: string) => void;
  onDelete?:    () => void;
  onBiometric?: () => void;
  biometric:    LoginBiometricType;
}> = ({ onKey, onDelete, onBiometric, biometric }) => (
  <div className={`${styles.grid3} ${styles.loginGrid}`}>
    {['1','2','3','4','5','6','7','8','9'].map((k) => (
      <KeyBtn key={k} label={k} onClick={() => onKey?.(k)} variant="login" />
    ))}
    {biometric !== 'none' ? (
      <button type="button" className={`${styles.key} ${styles.key_login} ${styles.loginBiometric}`}
        onClick={() => onBiometric?.()}>
        {biometric === 'face-id' ? <FaceIDIcon /> : <TouchIDIcon />}
      </button>
    ) : (
      <KeyBtn label="" onClick={() => {}} variant="blank" />
    )}
    <KeyBtn label="0" onClick={() => onKey?.('0')} variant="login" />
    <KeyBtn label={<DeleteIcon />} onClick={() => onDelete?.()} variant="login" />
  </div>
);

// ─── VirtualKeyboard ──────────────────────────────────────────────────────────

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  type,
  onKey,
  onDelete,
  onDone,
  onBiometric,
  transferSpecial  = 'dot',
  loginBiometric   = 'face-id',
  className        = '',
}) => (
  <div className={`${styles.root} ${className}`}>
    {type === 'pin' && (
      <PINKeyboard onKey={onKey} onDelete={onDelete} />
    )}
    {type === 'transfer' && (
      <TransferKeyboard onKey={onKey} onDelete={onDelete} onDone={onDone} special={transferSpecial} />
    )}
    {type === 'password' && (
      <PasswordKeyboard onKey={onKey} onDelete={onDelete} onDone={onDone} />
    )}
    {type === 'login' && (
      <LoginKeyboard onKey={onKey} onDelete={onDelete} onBiometric={onBiometric} biometric={loginBiometric} />
    )}
  </div>
);
