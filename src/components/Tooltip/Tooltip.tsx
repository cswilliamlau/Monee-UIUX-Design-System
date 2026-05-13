import React from 'react';
import styles from './Tooltip.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TooltipType    = 'basic' | 'onboarding';
export type TooltipVariant = 'default' | 'brand' | 'outlined';

/**
 * Position names follow the pattern: <side of anchor>-<alignment on that side>.
 * e.g. "bottom-center" → tooltip appears below the anchor, arrow centred.
 */
export type TooltipPosition =
  | 'bottom-center' | 'bottom-left'   | 'bottom-right'
  | 'top-center'    | 'top-left'      | 'top-right'
  | 'left-center'   | 'left-top'      | 'left-bottom'
  | 'right-center'  | 'right-top'     | 'right-bottom';

export interface TooltipProps {
  type?: TooltipType;
  /** Visual style — only applies to type="onboarding" */
  variant?: TooltipVariant;
  /** Which side the arrow is on and its alignment */
  position?: TooltipPosition;
  /** Bold orange title — onboarding only */
  title?: string;
  /** Body text */
  content: string;
  /** Step indicator string, e.g. "1/3" */
  step?: string;
  skipLabel?: string;
  nextLabel?: string;
  onSkip?: () => void;
  onNext?: () => void;
  className?: string;
}

// ─── Arrow direction helpers ──────────────────────────────────────────────────

// Map position → which face the arrow protrudes from, and H/V alignment
type ArrowDir = 'Up' | 'Down' | 'Left' | 'Right';
type ArrowAlign = 'Center' | 'HLeft' | 'HRight' | 'VTop' | 'VBottom';

const POSITION_MAP: Record<TooltipPosition, [ArrowDir, ArrowAlign]> = {
  'bottom-center': ['Up',    'Center'],
  'bottom-left':   ['Up',    'HLeft'],
  'bottom-right':  ['Up',    'HRight'],
  'top-center':    ['Down',  'Center'],
  'top-left':      ['Down',  'HLeft'],
  'top-right':     ['Down',  'HRight'],
  'left-center':   ['Right', 'Center'],
  'left-top':      ['Right', 'VTop'],
  'left-bottom':   ['Right', 'VBottom'],
  'right-center':  ['Left',  'Center'],
  'right-top':     ['Left',  'VTop'],
  'right-bottom':  ['Left',  'VBottom'],
};

// ─── Tooltip ─────────────────────────────────────────────────────────────────

export const Tooltip: React.FC<TooltipProps> = ({
  type      = 'basic',
  variant   = 'default',
  position  = 'bottom-center',
  title,
  content,
  step,
  skipLabel = 'Skip',
  nextLabel = 'Next',
  onSkip,
  onNext,
  className = '',
}) => {
  const [arrowDir, arrowAlign] = POSITION_MAP[position];

  const wrapperCls = [
    styles.tooltip,
    styles[type],
    type === 'onboarding' && variant === 'brand'    ? styles.brand    : '',
    type === 'onboarding' && variant === 'outlined' ? styles.outlined : '',
    styles[`arrow${arrowDir}`],
    arrowAlign === 'HLeft'   ? styles.arrowHLeft   : '',
    arrowAlign === 'HRight'  ? styles.arrowHRight  : '',
    arrowAlign === 'VTop'    ? styles.arrowVTop    : '',
    arrowAlign === 'VBottom' ? styles.arrowVBottom : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperCls}>
      <span className={styles.arrow} />

      {type === 'basic' && (
        <span className={styles.content}>{content}</span>
      )}

      {type === 'onboarding' && (
        <>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.content}>{content}</div>
          <div className={styles.footer}>
            <span className={styles.step}>{step}</span>
            <div className={styles.footerBtns}>
              {onSkip !== undefined && (
                <button className={styles.btnSkip} onClick={onSkip}>{skipLabel}</button>
              )}
              {onNext !== undefined && (
                <button className={styles.btnNext} onClick={onNext}>{nextLabel}</button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
