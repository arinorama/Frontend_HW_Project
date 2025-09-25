import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const inputVariants = cva(
  // Base classes
  "transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        amount: "bg-white border-2 border-gray-300 rounded text-gray-800 focus:border-atm-blue focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-atm-blue",
        default: "border border-gray-300 rounded text-gray-800 focus:border-atm-blue focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-atm-blue"
      },
      size: {
        small: "px-2 py-1 text-sm",
        medium: "px-3 py-2 text-base",
        large: "px-4 py-3 text-lg"
      }
    },
    compoundVariants: [
      // No PIN-specific compound variants needed anymore
    ],
    defaultVariants: {
      variant: "default",
      size: "medium"
    }
  }
)

type InputProps = VariantProps<typeof inputVariants> & {
  type?: 'text' | 'password' | 'number'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  maxLength?: number
  disabled?: boolean
  autoFocus?: boolean
  id?: string
  'data-testid'?: string
  className?: string
}

const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  maxLength,
  disabled = false,
  autoFocus = false,
  id,
  variant,
  size,
  'data-testid': testId,
  className
}: InputProps) => {
  
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      autoFocus={autoFocus}
      className={clsx(inputVariants({ variant, size }), className)}
      data-testid={testId}
    />
  )
}

export default Input