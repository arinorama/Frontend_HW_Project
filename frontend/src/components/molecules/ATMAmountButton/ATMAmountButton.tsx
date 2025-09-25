type ATMAmountButtonProps = {
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
      className={`
        py-3 px-4 
        transition-all duration-200 
        border-2 
        font-medium
        disabled:cursor-not-allowed
        ${isSelected 
          ? 'atm-success atm-success-border shadow-lg atm-success-hover' 
          : 'atm-neutral atm-neutral-border atm-neutral-hover'
        }
        ${disabled ? 'opacity-50' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      data-testid={testId}
    >
      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}
    </button>
  )
}

export default ATMAmountButton