import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import { useAppSelector } from '../../../hooks/redux'
import { selectPinClearTrigger } from '../../../features/uiSlice'
import { handleATMKeyDown } from '../../../lib/utils'

const pinInputVariants = cva(
  // Base classes
  "transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent border-0 border-b-2 border-text-white text-center text-text-white w-32 caret-transparent placeholder-white",
        compact: "bg-transparent border-0 border-b-1 border-text-white text-center text-text-white w-24 caret-transparent placeholder-white"
      },
      size: {
        small: "px-2 py-1 text-base",
        medium: "px-3 py-2 text-lg",
        large: "px-4 py-3 text-2xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "large"
    }
  }
)

type PinInputProps = VariantProps<typeof pinInputVariants> & {
  onPinComplete: (pin: string) => void
  maxLength?: number
  placeholder?: string
  disabled?: boolean
  autoFocus?: boolean
  error?: string | null
  'data-testid'?: string
  className?: string
}

const PinInput = ({
  onPinComplete,
  maxLength = 4,
  placeholder = "",
  disabled = false,
  autoFocus = false,
  error,
  variant,
  size,
  'data-testid': testId,
  className
}: PinInputProps) => {
  const [pin, setPin] = useState('')
  const pinClearTrigger = useAppSelector(selectPinClearTrigger)
  const inputRef = useRef<HTMLInputElement>(null)

  // Clear PIN when Redux clearTrigger changes
  useEffect(() => {
    if (pinClearTrigger > 0) {
      setPin('')
    }
  }, [pinClearTrigger])

  // Clear PIN and refocus when error occurs
  useLayoutEffect(() => {
    if (error) {
      setPin('')
      // Focus immediately after DOM updates but before browser paint
      inputRef.current?.focus()
    }
  }, [error])

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    
    const value = e.target.value.replace(/\D/g, '').slice(0, maxLength) // Only numbers, max length
    setPin(value)
    
    // Auto-submit when PIN is complete
    if (value.length === maxLength) {
      setTimeout(() => onPinComplete(value), 100)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle Enter key to submit PIN
    if (e.key === 'Enter' && pin.length >= 1) {
      e.preventDefault()
      onPinComplete(pin)
      return
    }
    
    // Use ATM keyboard validation (numbers, backspace, delete, enter only)
    handleATMKeyDown(e)
  }

  return (
    <input
      ref={inputRef}
      type="password"
      value={pin}
      onChange={handlePinChange}
      onKeyDown={handleKeyDown}
      maxLength={maxLength}
      placeholder={placeholder}
      disabled={disabled}
      autoFocus={autoFocus}
      className={clsx(pinInputVariants({ variant, size }), className)}
      data-testid={testId}
      autoComplete="off"
    />
  )
}

export default PinInput