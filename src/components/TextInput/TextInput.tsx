import React, { useState, useId } from 'react';
import styles from './TextInput.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TextInputVariant = 'default' | 'withLabel';
export type TextInputState   = 'enabled' | 'error' | 'warning' | 'disabled';
export type TextInputSize    = 'default' | 'small';

export interface TextInputProps {
  /** `default` = label acts as placeholder  |  `withLabel` = floating label */
  variant?:     TextInputVariant;
  /** Visual validation state */
  state?:       TextInputState;
  size?:        TextInputSize;
  label?:       string;
  placeholder?: string;
  value?:       string;
  defaultValue?: string;
  onChange?:    (value: string) => void;
  /** Small helper text shown below the field */
  hintText?:    string;
  /** Error / warning message shown below the field */
  helperText?:  string;
  /** Render an eye-toggle icon for password fields */
  password?:    boolean;
  /** Show a clear (✕) button when the field has a value */
  showClear?:   boolean;
  className?:   string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 3l14 14M8.54 8.55A3 3 0 0011.46 11.45M6.72 6.72C5.06 7.68 3.67 9.19 3 10c1.667 2.333 4.5 5 7 5a6.84 6.84 0 003.28-.72M9.88 5.06C9.92 5.04 9.96 5.02 10 5c2.5 0 5.333 2.667 7 5-.5.7-1.17 1.47-1.97 2.15"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EyeOnIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 10c1.667-2.333 4.5-5 7-5s5.333 2.667 7 5c-1.667 2.333-4.5 5-7 5s-5.333-2.667-7-5z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const ClearIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" fill="currentColor" opacity="0.25"/>
    <path d="M7.5 7.5l5 5M12.5 7.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const HintIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M7 6.5V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="7" cy="4.5" r="0.75" fill="currentColor"/>
  </svg>
);

// ─── TextInput ────────────────────────────────────────────────────────────────

export const TextInput: React.FC<TextInputProps> = ({
  variant      = 'default',
  state        = 'enabled',
  size         = 'default',
  label        = '',
  placeholder  = '',
  value,
  defaultValue = '',
  onChange,
  hintText,
  helperText,
  password     = false,
  showClear    = false,
  className    = '',
}) => {
  const uid = useId();
  const [internalVal, setInternalVal]   = useState(defaultValue);
  const [isFocused,   setIsFocused]     = useState(false);
  const [showPw,      setShowPw]        = useState(false);

  const currentVal = value !== undefined ? value : internalVal;
  const hasValue   = currentVal.length > 0;
  const isFloated  = variant === 'withLabel' && (isFocused || hasValue);
  const isDisabled = state === 'disabled';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (value === undefined) setInternalVal(e.target.value);
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    if (value === undefined) setInternalVal('');
    onChange?.('');
  };

  // CSS class composition
  const rootCls = [
    styles.root,
    styles[`size_${size}`],
    styles[`state_${state}`],
    variant === 'withLabel' ? styles.withLabel : styles.varDefault,
    isFocused ? styles.focused : '',
    className,
  ].filter(Boolean).join(' ');

  const helperColor =
    state === 'error'   ? styles.helperError :
    state === 'warning' ? styles.helperWarning :
    styles.helperHint;

  return (
    <div className={rootCls}>
      {/* Floating label (withLabel variant only) */}
      {variant === 'withLabel' && label && (
        <label
          htmlFor={uid}
          className={`${styles.floatingLabel} ${isFloated ? styles.floatingLabelUp : ''}`}
        >
          {label}
        </label>
      )}

      {/* Input row */}
      <div className={styles.inputRow}>
        <input
          id={uid}
          className={styles.input}
          type={password && !showPw ? 'password' : 'text'}
          value={currentVal}
          placeholder={variant === 'default' ? (label || placeholder) : (isFloated ? placeholder : '')}
          disabled={isDisabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
        />

        {/* Right icons */}
        <span className={styles.icons}>
          {showClear && hasValue && !isDisabled && (
            <button type="button" className={styles.iconBtn} onClick={handleClear} tabIndex={-1}>
              <ClearIcon />
            </button>
          )}
          {password && (
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => setShowPw((p) => !p)}
              tabIndex={-1}
            >
              {showPw ? <EyeOnIcon /> : <EyeOffIcon />}
            </button>
          )}
        </span>
      </div>

      {/* Helper / hint text */}
      {(helperText || hintText) && (
        <div className={`${styles.helper} ${helperColor}`}>
          <HintIcon />
          <span>{helperText ?? hintText}</span>
        </div>
      )}
    </div>
  );
};
