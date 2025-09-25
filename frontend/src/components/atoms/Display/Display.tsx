import React from 'react'
import { cn } from '../../../lib/utils'

type DisplayProps = {
  children: React.ReactNode
  variant?: 'masked' | 'balance' | 'amount' | 'info' | 'default'
  size?: 'small' | 'medium' | 'large'
  'data-testid'?: string
  className?: string
}

const Display = ({
  children,
  variant = 'default',
  size = 'medium',
  'data-testid': testId,
  className = ''
}: DisplayProps) => {
  
  // Variant-based styling
  const variantClasses = {
    masked: 'text-xl font-mono text-text-white h-8 mt-2',
    balance: 'text-3xl font-bold text-text-white bg-black/20 px-6 py-3 rounded-lg border-2 border-white/30',
    amount: 'text-xl font-semibold text-text-primary bg-gray-100 px-3 py-2 rounded',
    info: 'text-base text-atm-info bg-atm-info px-3 py-2 rounded-md',
    default: 'text-base text-text-primary'
  }
  
  // Size-based styling  
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  }
  
  return (
    <div 
      className={cn(
        variant === 'default' 
          ? [variantClasses[variant], sizeClasses[size]]
          : variantClasses[variant],
        className
      )} 
      data-testid={testId}
    >
      {children}
    </div>
  )
}

export default Display