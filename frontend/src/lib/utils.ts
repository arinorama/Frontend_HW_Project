import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ATM Keyboard utility functions
export const ATM_KEY_CODES = {
  BACKSPACE: 8,
  ENTER: 13,
  DELETE: 46,
  // Number keys (top row: 0-9)
  NUMBER_0: 48,
  NUMBER_9: 57,
  // Numpad keys (0-9)
  NUMPAD_0: 96,
  NUMPAD_9: 105,
} as const

/**
 * Checks if a key is a number (0-9) from keyboard or numpad
 * Used for ATM PIN and amount inputs
 */
export const isNumberKey = (keyCode: number): boolean => {
  return (
    (keyCode >= ATM_KEY_CODES.NUMBER_0 && keyCode <= ATM_KEY_CODES.NUMBER_9) ||
    (keyCode >= ATM_KEY_CODES.NUMPAD_0 && keyCode <= ATM_KEY_CODES.NUMPAD_9)
  )
}

/**
 * ATM PIN input validation - only allows numbers, backspace, delete, enter
 * Prevents all other keys from being entered
 */
export const handleATMKeyDown = (e: React.KeyboardEvent): void => {
  const { keyCode } = e
  
  // Allow: numbers (0-9), backspace, delete, enter
  const isAllowed = 
    isNumberKey(keyCode) ||
    keyCode === ATM_KEY_CODES.BACKSPACE ||
    keyCode === ATM_KEY_CODES.DELETE ||
    keyCode === ATM_KEY_CODES.ENTER

  if (!isAllowed) {
    e.preventDefault()
  }
}