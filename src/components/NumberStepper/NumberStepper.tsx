import React, { useState } from 'react';
import styles from './NumberStepper.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type StepperSize     = 'small' | 'regular' | 'large';
export type StepperUnitPos  = 'left' | 'right';

export interface NumberStepperProps {
  value?:        number;
  defaultValue?: number;
  onChange?:     (value: number) => void;
  min?:          number;
  max?:          number;
  step?:         number;
  size?:         StepperSize;
  disabled?:     boolean;
  /** Unit label shown beside the value */
  unit?:         string;
  /** Which side the unit label appears on. Default `'right'`. */
  unitPosition?: StepperUnitPos;
  className?:    string;
}

// ─── NumberStepper ────────────────────────────────────────────────────────────

export const NumberStepper: React.FC<NumberStepperProps> = ({
  value,
  defaultValue  = 1,
  onChange,
  min,
  max,
  step          = 1,
  size          = 'regular',
  disabled      = false,
  unit,
  unitPosition  = 'right',
  className     = '',
}) => {
  const [internal, setInternal] = useState(defaultValue);
  const current = value !== undefined ? value : internal;

  const atMin = min !== undefined && current <= min;
  const atMax = max !== undefined && current >= max;

  const update = (next: number) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const decrement = () => { if (!disabled && !atMin) update(current - step); };
  const increment = () => { if (!disabled && !atMax) update(current + step); };

  const cls = [styles.root, styles[`size_${size}`], className].filter(Boolean).join(' ');

  const minusDisabled = disabled || atMin;
  const plusDisabled  = disabled || atMax;

  const displayValue = unit
    ? unitPosition === 'left'
      ? `${unit}${current.toLocaleString()}`
      : `${current.toLocaleString()}${unit}`
    : current.toLocaleString();

  return (
    <div className={cls} aria-label="number stepper">
      <button
        type="button"
        className={`${styles.btn} ${minusDisabled ? styles.btnDisabled : styles.btnActive}`}
        onClick={decrement}
        disabled={minusDisabled}
        aria-label="decrease"
      >
        <span className={styles.symbol}>−</span>
      </button>

      <span className={`${styles.value} ${disabled ? styles.valueDisabled : ''}`}>
        {displayValue}
      </span>

      <button
        type="button"
        className={`${styles.btn} ${plusDisabled ? styles.btnDisabled : styles.btnActive}`}
        onClick={increment}
        disabled={plusDisabled}
        aria-label="increase"
      >
        <span className={styles.symbol}>+</span>
      </button>
    </div>
  );
};
