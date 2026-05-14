import React from 'react';
import styles from './StepBar.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type StepStatus      = 'done' | 'doing' | 'not-yet';
export type StepBarOrientation = 'horizontal' | 'vertical';

export interface StepItem {
  key:       string;
  status:    StepStatus;
  /** Horizontal: label shown below the dot */
  label?:    string;
  /** Vertical: bold line above subtitle */
  title?:    string;
  /** Vertical: secondary description */
  subtitle?: string;
}

export interface StepBarProps {
  steps:        StepItem[];
  orientation?: StepBarOrientation;
  className?:   string;
}

// ─── Vertical indicator ───────────────────────────────────────────────────────

const VerticalIndicator: React.FC<{ status: StepStatus; showLine: boolean }> = ({
  status,
  showLine,
}) => (
  <div className={styles.vIndicatorCol}>
    <div className={`${styles.circle} ${styles[`circle_${status.replace('-', '')}`]}`} />
    {showLine && (
      <div className={`${styles.vLine} ${styles[`vLine_${status === 'done' ? 'done' : status === 'doing' ? 'doing' : 'notyet'}`]}`} />
    )}
  </div>
);

// ─── StepBar ─────────────────────────────────────────────────────────────────

export const StepBar: React.FC<StepBarProps> = ({
  steps,
  orientation = 'vertical',
  className   = '',
}) => {
  if (orientation === 'horizontal') {
    return (
      <div className={`${styles.hWrap} ${className}`}>
        {/* dots + bars row */}
        <div className={styles.hTrack}>
          {steps.map((step, i) => {
            const isLast    = i === steps.length - 1;
            const barActive = step.status === 'done' || step.status === 'doing';
            return (
              <React.Fragment key={step.key}>
                <div className={`${styles.hDot} ${styles[`hDot_${step.status.replace('-', '')}`]}`} />
                {!isLast && (
                  <div className={`${styles.hBar} ${barActive ? styles.hBar_active : styles.hBar_inactive}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
        {/* labels row */}
        <div className={styles.hLabels}>
          {steps.map((step) => (
            <div
              key={step.key}
              className={`${styles.hLabel} ${styles[`hLabel_${step.status.replace('-', '')}`]}`}
            >
              {step.label ?? ''}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // vertical
  return (
    <div className={`${styles.vWrap} ${className}`}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div key={step.key} className={styles.vStep}>
            <VerticalIndicator status={step.status} showLine={!isLast} />
            <div className={styles.vContent}>
              <span className={`${styles.vTitle} ${styles[`vTitle_${step.status.replace('-', '')}`]}`}>
                {step.title ?? ''}
              </span>
              {step.subtitle && (
                <span className={styles.vSubtitle}>{step.subtitle}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
