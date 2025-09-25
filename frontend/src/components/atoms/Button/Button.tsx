import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const buttonVariants = cva(
  // Base classes
  "transition-colors font-medium focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        sidebar: "atm-button w-button-w h-button-h text-button p-button-p",
        screen: "cursor-pointer underline hover:no-underline",
        action: "atm-button rounded-md font-semibold"
      },
      size: {
        small: "text-xs px-2 py-1",
        medium: "text-sm px-4 py-2", 
        large: "text-lg px-6 py-3"
      }
    },
    compoundVariants: [
      {
        variant: "screen",
        size: "large",
        class: "text-xl"
      },
      {
        variant: "action",
        size: "large", 
        class: "px-8 py-4"
      }
    ],
    defaultVariants: {
      variant: "sidebar",
      size: "medium"
    }
  }
)

type ButtonProps = VariantProps<typeof buttonVariants> & {
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  'data-testid'?: string
  className?: string
}

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant,
  size,
  'data-testid': testId,
  className
}: ButtonProps) => {
  
  // For screen variant, use span
  if (variant === 'screen') {
    return (
      <span
        className={clsx(
          buttonVariants({ variant, size }), 
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={disabled ? undefined : onClick}
        data-testid={testId}
      >
        {children}
      </span>
    )
  }
  
  // For sidebar and action variants, use button
  return (
    <button
      className={clsx(buttonVariants({ variant, size }), className)}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
    >
      {children}
    </button>
  )
}

export default Button