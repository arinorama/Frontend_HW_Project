import { useEffect } from 'react'
import { ATMAmountButton } from '../../molecules'
import { ATMScreenLayout } from '../../layouts'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { setCurrentAmount, setTransactionType, selectCurrentAmount, selectUILoading, selectUIError } from '../../../features/uiSlice'
import { useTranslation } from '../../../hooks/useTranslation'

const DepositScreen = () => {
  const dispatch = useAppDispatch()
  const currentAmount = useAppSelector(selectCurrentAmount)
  const isLoading = useAppSelector(selectUILoading)
  const error = useAppSelector(selectUIError)
  const { t } = useTranslation()



  // Set transaction type when component mounts
  useEffect(() => {
    dispatch(setTransactionType('deposit'))
  }, [dispatch])

  const handleAmountSelect = (selectedAmount: number) => {
    dispatch(setCurrentAmount(selectedAmount.toString()))
  }

  const quickAmounts = [50, 100, 250, 500]

  return (
    <ATMScreenLayout 
      instruction={t('screens.selectDepositAmount')}
      error={error}
      errorTestId="deposit-error-message"
      screenTestId="deposit-screen"
    >
      {/* Quick Amount Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6 max-w-xs mx-auto">
        {quickAmounts.map((quickAmount) => (
          <ATMAmountButton
            key={quickAmount}
            amount={quickAmount}
            isSelected={currentAmount === quickAmount.toString()}
            onSelect={handleAmountSelect}
            disabled={isLoading}
            data-testid={`quick-amount-${quickAmount}`}
          />
        ))}
      </div>
    </ATMScreenLayout>
  )
}

export default DepositScreen