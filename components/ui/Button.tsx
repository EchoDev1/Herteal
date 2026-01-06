'use client';

import Link from 'next/link';
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

// Button variant types - House of CB Style
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: never;
  };

type ButtonAsLink = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

// House of CB Inspired Button Component
export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  // Base styles (House of CB inspired - minimal, clean)
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold uppercase tracking-[0.4px]
    transition-all duration-300 ease-in-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C5530] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    font-[family-name:var(--font-montserrat)]
  `;

  // Size styles
  const sizeStyles = {
    sm: 'px-6 py-2.5 text-xs',
    md: 'px-10 py-3.5 text-sm',
    lg: 'px-14 py-4.5 text-base',
  };

  // Variant styles (House of CB aesthetic - clean, minimal)
  const variantStyles = {
    primary: `
      bg-[#2C5530] text-white border-none
      hover:bg-[#1E3D22]
      active:bg-[#15291A]
    `,
    secondary: `
      bg-[#8B0000] text-white border-none
      hover:bg-[#6B0000]
      active:bg-[#4B0000]
    `,
    outline: `
      bg-transparent text-[#2C5530] border border-[#2C5530]
      hover:bg-[#2C5530] hover:text-white
      active:bg-[#1E3D22]
    `,
    text: `
      bg-transparent text-[#2D2D2D] border-none p-0
      underline underline-offset-4 decoration-1
      hover:text-[#2C5530] hover:decoration-[#2C5530]
      normal-case tracking-normal
    `,
  };

  // Combine all styles
  const buttonClasses = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Render as Link if href is provided
  if ('href' in props && props.href) {
    return (
      <Link
        href={props.href}
        className={buttonClasses}
        {...(props as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>)}
      >
        {children}
      </Link>
    );
  }

  // Render as button
  return (
    <button
      className={buttonClasses}
      {...(props as Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>)}
    >
      {children}
    </button>
  );
}

// Specific button variants for convenience
export function PrimaryButton(props: Omit<ButtonAsButton, 'variant'> | Omit<ButtonAsLink, 'variant'>) {
  return <Button {...props as ButtonProps} variant="primary" />;
}

export function SecondaryButton(props: Omit<ButtonAsButton, 'variant'> | Omit<ButtonAsLink, 'variant'>) {
  return <Button {...props as ButtonProps} variant="secondary" />;
}

export function OutlineButton(props: Omit<ButtonAsButton, 'variant'> | Omit<ButtonAsLink, 'variant'>) {
  return <Button {...props as ButtonProps} variant="outline" />;
}

export function TextLink(props: Omit<ButtonAsButton, 'variant'> | Omit<ButtonAsLink, 'variant'>) {
  return <Button {...props as ButtonProps} variant="text" />;
}
