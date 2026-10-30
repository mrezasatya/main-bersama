import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { sfx } from '../audio';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'soft' | 'ghost';
  icon?: ReactNode;
  size?: 'md' | 'lg' | 'xl';
}

export function BigButton({
  variant = 'primary',
  size = 'lg',
  icon,
  children,
  className = '',
  onClick,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={(e) => {
        sfx.tap();
        onClick?.(e);
      }}
      {...rest}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children && <span className="btn-label">{children}</span>}
    </button>
  );
}
