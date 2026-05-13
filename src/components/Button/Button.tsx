import React from 'react';
import styles from './Button.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'filled' | 'outline' | 'text';
export type ButtonColor   = 'shopee' | 'bank' | 'white-shopee' | 'white-bank' | 'black' | 'white';
export type ButtonSize    = 's' | 'm' | 'l' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style */
  variant?: ButtonVariant;
  /** Brand / color scheme */
  color?: ButtonColor;
  /** Height size */
  size?: ButtonSize;
  /** Expand to full container width */
  fullWidth?: boolean;
  /** Pill shape (border-radius: 999px). Height fixed at 44px (l). */
  rounded?: boolean;
  /** Adds shadow — use when floating over content */
  floating?: boolean;
  /** Gradient fill — only for rounded buttons */
  gradient?: boolean;
  children: React.ReactNode;
}

// ─── Button ───────────────────────────────────────────────────────────────────

export const Button: React.FC<ButtonProps> = ({
  variant  = 'filled',
  color    = 'shopee',
  size     = 'l',
  fullWidth = false,
  rounded   = false,
  floating  = false,
  gradient  = false,
  className = '',
  children,
  ...rest
}) => {
  const colorKey = gradient ? 'gradient' : `${variant}-${color}`;

  const cls = [
    styles.btn,
    rounded ? styles.rounded : styles[`size-${size}`],
    fullWidth && !rounded ? styles.fullWidth : '',
    floating ? styles.floating : '',
    styles[colorKey] ?? '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
};

// ─── ButtonGroup ──────────────────────────────────────────────────────────────

export type ButtonGroupLayout = 'horizontal' | 'vertical';

export interface ButtonGroupProps {
  layout?: ButtonGroupLayout;
  children: React.ReactNode;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  layout   = 'horizontal',
  children,
  className = '',
}) => {
  const cls = [
    styles.btnGroup,
    styles[`btnGroup-${layout}`],
    className,
  ].filter(Boolean).join(' ');

  return <div className={cls}>{children}</div>;
};

// ─── LoginButton ─────────────────────────────────────────────────────────────

export type LoginVariant = 'shopee' | 'mobile' | 'social';

export interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Login provider style */
  loginVariant?: LoginVariant;
  /** Icon element (24×24) placed at the left */
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  loginVariant = 'social',
  icon,
  children,
  className = '',
  ...rest
}) => {
  const cls = [
    styles.loginBtn,
    styles[`loginBtn-${loginVariant}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={cls} {...rest}>
      {icon && <span className={styles.loginBtnIcon}>{icon}</span>}
      <span className={styles.loginBtnLabel}>{children}</span>
    </button>
  );
};
