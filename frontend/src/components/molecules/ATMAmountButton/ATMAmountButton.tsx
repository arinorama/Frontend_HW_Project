import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../lib/utils'

const atmAmountButtonVariants = cva(
  // Base classes - mevcut Button'dan aldığımız temel sınıflar
  "transition-colors font-medium focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        // ATM amount button için özel variant
        amount: "py-3 px-4 transition-all duration-200 border-2 font-medium",
      },
      state: {
        // Selection durumları
        selected: "atm-success atm-success-border shadow-lg atm-success-hover",
        default: "atm-neutral atm-neutral-border atm-neutral-hover"
      },
      size: {
        small: "py-2 px-3 text-sm",
        medium: "py-3 px-4 text-base", 
        large: "py-4 px-6 text-lg"
      }
    },
    defaultVariants: {
      variant: "amount",
      state: "default",
      size: "medium"
    }
  }
)

type ATMAmountButtonProps = VariantProps<typeof atmAmountButtonVariants> & {
  amount: number
  isSelected: boolean
  onSelect?: (amount: number) => void
  disabled?: boolean
  'data-testid'?: string
  className?: string
}

const ATMAmountButton = ({
  amount,
  isSelected,
  onSelect,
  disabled = false,
  variant,
  size,
  'data-testid': testId,
  className = ''
}: ATMAmountButtonProps) => {
  const handleClick = () => {
    if (!disabled && onSelect) {
      onSelect(amount)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        atmAmountButtonVariants({ 
          variant, 
          state: isSelected ? 'selected' : 'default',
          size 
        }), 
        className
      )}
      data-testid={testId}
    >
      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}
    </button>
  )
}

export default ATMAmountButton