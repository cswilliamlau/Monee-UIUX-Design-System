import React, { useState } from 'react';
import styles from './SearchBox.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SearchBoxColor = 'grey' | 'white';
export type SearchBoxSize  = 'normal' | 'topbar';

export interface SearchBoxProps {
  /** `grey` = for light/white backgrounds · `white` = for coloured (orange) backgrounds */
  color?:           SearchBoxColor;
  /** `normal` = 44 px · `topbar` = 40 px */
  size?:            SearchBoxSize;
  placeholder?:     string;
  value?:           string;
  defaultValue?:    string;
  onChange?:        (value: string) => void;
  /** Show a camera / scan icon on the right */
  showCamera?:      boolean;
  onCamera?:        () => void;
  /** Location badge text shown at the far right (location variant) */
  location?:        string;
  onLocationClick?: () => void;
  className?:       string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M11.5 11.5L16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const ClearIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7.5" fill="currentColor" opacity="0.3"/>
    <path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CameraIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M7 3h6l1.5 2H16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1h1.5L7 3z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="10" cy="10.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1.5a4.5 4.5 0 014.5 4.5c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 018 1.5z"
      fill="var(--mnd-color-fg-shopee)" stroke="var(--mnd-color-fg-shopee)" strokeWidth="0.5"/>
    <circle cx="8" cy="6" r="1.5" fill="white"/>
  </svg>
);

// ─── SearchBox ────────────────────────────────────────────────────────────────

export const SearchBox: React.FC<SearchBoxProps> = ({
  color        = 'grey',
  size         = 'normal',
  placeholder  = 'Placeholder Text',
  value,
  defaultValue = '',
  onChange,
  showCamera   = true,
  onCamera,
  location,
  onLocationClick,
  className    = '',
}) => {
  const [internalVal, setInternalVal] = useState(defaultValue);
  const [isFocused,   setIsFocused]   = useState(false);

  const currentVal = value !== undefined ? value : internalVal;
  const hasValue   = currentVal.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setInternalVal(e.target.value);
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    if (value === undefined) setInternalVal('');
    onChange?.('');
  };

  const cls = [
    styles.root,
    styles[`color_${color}`],
    styles[`size_${size}`],
    isFocused ? styles.focused : '',
    location   ? styles.hasLocation : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {/* Search icon */}
      <span className={styles.searchIcon}>
        <SearchIcon />
      </span>

      {/* Text input */}
      <input
        className={styles.input}
        type="search"
        value={currentVal}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
      />

      {/* Clear button — only when focused and has value */}
      {isFocused && hasValue && (
        <button type="button" className={styles.iconBtn} onClick={handleClear} tabIndex={-1}>
          <ClearIcon />
        </button>
      )}

      {/* Location badge */}
      {location && (
        <>
          <div className={styles.divider} />
          <button
            type="button"
            className={styles.locationBtn}
            onClick={onLocationClick}
            tabIndex={-1}
          >
            <PinIcon />
            <span className={styles.locationText}>{location}</span>
          </button>
        </>
      )}

      {/* Camera icon */}
      {showCamera && !location && (
        <button type="button" className={styles.iconBtn} onClick={onCamera} tabIndex={-1}>
          <CameraIcon />
        </button>
      )}
    </div>
  );
};
