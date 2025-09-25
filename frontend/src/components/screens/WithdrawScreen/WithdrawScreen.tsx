import { useEffect } from 'react'
import { ATMAmountButton } from '../../molecules'
import { ATMScreenLayout } from '../../layouts'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { setCurrentAmount, setTransactionType, selectCurrentAmount, selectUILoading, selectUIError } from '../../../features/uiSlice'
import { useTranslation } from '../../../hooks/useTranslation'

const WithdrawScreen = () => {
  const dispatch = useAppDispatch()
  const currentAmount = useAppSelector(selectCurrentAmount)
  const isLoading = useAppSelector(selectUILoading)
  const error = useAppSelector(selectUIError)
  const { t } = useTranslation()



  // Set transaction type when component mounts
  useEffect(() => {
    dispatch(setTransactionType('withdraw'))
  }, [dispatch])

  const handleAmountSelect = (selectedAmount: number) => {
    dispatch(setCurrentAmount(selectedAmount.toString()))
  }

  const quickAmounts = [20, 50, 100, 200]

  return (
    <ATMScreenLayout 
      instruction={t('screens.selectWithdrawAmount')}
      error={error}
      errorTestId="withdraw-error-message"
      screenTestId="withdraw-screen"
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

export default WithdrawScreen