import { useEffect } from 'react'
import { ATMAmountButton } from '../../molecules'
import { ATMScreenLayout } from '../../layouts'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { 
  fetchBalance, 
  selectBalance, 
  selectAccountLoading, 
  selectAccountError 
} from '../../../features/accountSlice'
import { selectUser } from '../../../features/authSlice'
import { useTranslation } from '../../../hooks/useTranslation'

const BalanceScreen = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const balance = useAppSelector(selectBalance)
  const isLoading = useAppSelector(selectAccountLoading)
  const error = useAppSelector(selectAccountError)
  const { t } = useTranslation()

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchBalance(user.id))
    }
  }, [dispatch, user?.id])

  return (
    <ATMScreenLayout 
      instruction={isLoading ? t('screens.loadingBalance') : t('screens.currentBalance')}
      error={error}
      errorTestId="balance-error-message"
      screenTestId="balance-screen"
    >
      {/* Balance Display */}
      <div className="mb-6 max-w-xs mx-auto">
        <ATMAmountButton
          amount={balance || 0}
          isSelected={false}
          disabled={isLoading}
          data-testid="balance-amount"
        />
      </div>
    </ATMScreenLayout>
  )
}

export default BalanceScreen