import React from 'react';
import styles from './Dialog.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DialogBrand       = 'shopee' | 'bank';
export type DialogImageRatio  = '1x1' | '2x3' | '3x4';
export type DialogButtonLayout = 'vertical' | 'horizontal';

export interface DialogProps {
  /** Dialog title — max 2 lines */
  title: string;
  /** Body text below the title */
  content?: string;
  /** 48×48 icon element shown centred above the title */
  icon?: React.ReactNode;
  /** Image element (use <img> or a placeholder div) shown at the top of the card */
  image?: React.ReactNode;
  /** Aspect ratio applied to the image container */
  imageRatio?: DialogImageRatio;
  /** Brand colour for all buttons */
  brand?: DialogBrand;
  /** Primary button label */
  primaryLabel?: string;
  /** Secondary button label — renders a second button when provided */
  secondaryLabel?: string;
  /** Layout of the button group when secondaryLabel is present */
  buttonLayout?: DialogButtonLayout;
  /** Wraps the dialog in a full-screen dark overlay */
  withMask?: boolean;
  /** Primary button click handler */
  onPrimary?: () => void;
  /** Secondary button click handler */
  onSecondary?: () => void;
  className?: string;
}

// ─── Dialog ───────────────────────────────────────────────────────────────────

export const Dialog: React.FC<DialogProps> = ({
  title,
  content,
  icon,
  image,
  imageRatio = '1x1',
  brand = 'shopee',
  primaryLabel,
  secondaryLabel,
  buttonLayout = 'vertical',
  withMask = false,
  onPrimary,
  onSecondary,
  className = '',
}) => {
  const hasActions = Boolean(primaryLabel);
  const hasTwoButtons = hasActions && Boolean(secondaryLabel);

  const card = (
    <div className={[styles.dialog, className].filter(Boolean).join(' ')}>
      {image && (
        <div className={[styles.image, styles[`image--${imageRatio}`]].join(' ')}>
          {image}
        </div>
      )}

      <div className={styles.body}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.title}>{title}</div>
        {content && <div className={styles.content}>{content}</div>}
      </div>

      {hasActions && (
        <div className={styles.actions}>
          {hasTwoButtons ? (
            <div className={[
              styles.btnGroup,
              styles[`btnGroup--${buttonLayout}`],
            ].join(' ')}>
              <button
                className={[styles.btnGroupBtn, styles[`btnSecondary--${brand}`]].join(' ')}
                onClick={onSecondary}
              >
                {secondaryLabel}
              </button>
              <button
                className={[styles.btnGroupBtn, styles[`btnPrimary--${brand}`]].join(' ')}
                onClick={onPrimary}
              >
                {primaryLabel}
              </button>
            </div>
          ) : (
            <button
              className={[styles.btnGroupBtn, styles[`btnPrimary--${brand}`]].join(' ')}
              onClick={onPrimary}
            >
              {primaryLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );

  if (withMask) {
    return <div className={styles.overlay}>{card}</div>;
  }

  return card;
};
