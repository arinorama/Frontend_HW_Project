import React from 'react'

type TextProps = {
  children: React.ReactNode
  variant?: 'body' | 'subtitle' | 'caption' | 'label' | 'branding'
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'secondary' | 'white' | 'gray' | 'error'
  'data-testid'?: string
  className?: string
}

const Text = ({
  children,
  variant = 'body',
  size = 'medium',
  color = 'primary',
  'data-testid': testId,
  className = ''
}: TextProps) => {
  
  // Variant-based styling
  const variantClasses = {
    body: 'text-base',
    subtitle: 'text-lg font-medium',
    caption: 'text-sm',
    label: 'text-sm font-semibold',
    branding: 'text-lg'
  }
  
  // Size-based styling
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base', 
    large: 'text-lg'
  }
  
  // Color-based styling
  const colorClasses = {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    white: 'text-text-white',
    gray: 'text-text-muted',
    error: 'text-atm-error'
  }
  
  const baseClasses = `${variantClasses[variant]} ${sizeClasses[size]} ${colorClasses[color]}`
  const finalClasses = `${baseClasses} ${className}`.trim()
  
  return (
    <span className={finalClasses} data-testid={testId}>
      {children}
    </span>
  )
}

export default Text