import React from 'react';
import styles from './Tooltip.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TooltipType    = 'basic' | 'onboarding';
export type TooltipVariant = 'default' | 'brand';

/**
 * Position = which side of the anchor the tooltip appears on + caret alignment.
 * e.g. "bottom-center" → tooltip below the anchor, caret centred at top.
 */
export type TooltipPosition =
  | 'bottom-center' | 'bottom-left'   | 'bottom-right'
  | 'top-center'    | 'top-left'      | 'top-right'
  | 'left-center'   | 'left-top'      | 'left-bottom'
  | 'right-center'  | 'right-top'     | 'right-bottom';

export interface TooltipProps {
  type?: TooltipType;
  /**
   * Visual style (onboarding only):
   * - `default` — white bg, black title
   * - `brand`   — light shopee-tint bg (#fff6f4), orange title
   */
  variant?: TooltipVariant;
  /**
   * Adds a shopee-coloured border. Only meaningful with variant="brand".
   */
  outlined?: boolean;
  /** Which side the caret appears on and its alignment */
  position?: TooltipPosition;
  /** Bold title — onboarding only */
  title?: string;
  /** Body text */
  content: string;
  /** Step indicator, e.g. "1/3" */
  step?: string;
  skipLabel?: string;
  nextLabel?: string;
  onSkip?: () => void;
  onNext?: () => void;
  className?: string;
}

// ─── Arrow direction helpers ──────────────────────────────────────────────────

type ArrowDir   = 'Up' | 'Down' | 'Left' | 'Right';
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
  outlined  = false,
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

  const cls = [
    styles.tooltip,
    styles[type],
    type === 'onboarding' && variant === 'brand' ? styles.brand    : '',
    type === 'onboarding' && outlined            ? styles.outlined : '',
    styles[`arrow${arrowDir}`],
    arrowAlign === 'HLeft'   ? styles.arrowHLeft   : '',
    arrowAlign === 'HRight'  ? styles.arrowHRight  : '',
    arrowAlign === 'VTop'    ? styles.arrowVTop    : '',
    arrowAlign === 'VBottom' ? styles.arrowVBottom : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls}>
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
