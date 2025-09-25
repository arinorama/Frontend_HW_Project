import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../lib/utils'

const titleVariants = cva('', {
  variants: {
    variant: {
      welcome: 'text-4xl font-bold text-text-white',
      screen: 'text-2xl font-semibold text-text-white',
      default: 'text-xl font-medium text-text-primary'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

type TitleProps = {
  children: React.ReactNode
  'data-testid'?: string
  className?: string
} & VariantProps<typeof titleVariants>

const Title = ({
  children,
  variant,
  'data-testid': testId,
  className
}: TitleProps) => {
  
  const finalClasses = cn(titleVariants({ variant }), className)
  
  return (
    <h1 className={finalClasses} data-testid={testId}>
      {children}
    </h1>
  )
}

export default Title