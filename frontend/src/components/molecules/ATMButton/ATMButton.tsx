import type { ScreenType } from '../../../types'
import { Button } from '../../atoms'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useTranslation } from '../../../hooks/useTranslation'
import { cn } from '../../../lib/utils'
import { 
  withdrawMoney, 
  depositMoney
} from '../../../features/transactionSlice'
import { 
  selectCurrentAmount, 
  selectTransactionType, 
  clearUIState 
} from '../../../features/uiSlice'
import { selectUser } from '../../../features/authSlice'
import { updateBalance } from '../../../features/accountSlice'
import type { RootState } from '../../../store'
import type { TransactionState } from '../../../features/transactionSlice'
import { navigationService, type ActionContext } from '../../../services/navigationService'



type ATMButtonProps = {
  side: 'left' | 'right'
  label: string | null
  currentScreen?: ScreenType
  onScreenChange?: (screen: ScreenType) => void
  disabled?: boolean
  'data-testid'?: string
  className?: string
}

// Unified Connection Component for ATMButton internal use
type ConnectionProps = {
  side: 'left' | 'right'
  variant: 'button-screen' | 'label-edge'
  className?: string
}

const Connection = ({ side, variant, className = '' }: ConnectionProps) => {
  if (variant === 'button-screen') {
    const buttonScreenClasses = `absolute top-1/2 transform -translate-y-1/2 text-xs w-3 ${
      side === 'left' ? 'left-full' : 'right-full'
    }`
    return (
      <div className={cn("text-gray-400", buttonScreenClasses, className)}>
        —
      </div>
    )
  }

  // variant === 'label-edge' - reversed positioning
  const labelEdgeClasses = `absolute top-1/2 transform -translate-y-1/2 text-sm ${
    side === 'left' ? 'right-full mr-1' : 'left-full ml-1'
  }`
  return (
    <div className={cn("text-text-white", labelEdgeClasses, className)}>
      —
    </div>
  )
}

const ATMButton = ({
  side,
  label,
  currentScreen,
  onScreenChange,
  disabled = false,
  'data-testid': testId,
  className = ''
}: ATMButtonProps) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const currentAmount = useAppSelector(selectCurrentAmount)
  const transactionType = useAppSelector(selectTransactionType)
  const isLoading = useAppSelector((state: RootState) => (state.transactions as TransactionState).isLoading)
  const { changeLanguage, t, currentLanguage } = useTranslation()



  const handleTransaction = async () => {
    if (!user?.id || !currentAmount || !transactionType) return
    
    const amount = parseFloat(currentAmount)
    if (amount <= 0) return
    
    try {
      let result
      if (transactionType === 'withdraw') {
        result = await dispatch(withdrawMoney({ userId: user.id, amount }))
      } else {
        result = await dispatch(depositMoney({ userId: user.id, amount }))
      }
      
      if (withdrawMoney.fulfilled.match(result) || depositMoney.fulfilled.match(result)) {
        dispatch(updateBalance(result.payload.newBalance))
        dispatch(clearUIState())
        // State Machine will handle the navigation to balance screen
        // No need to manually navigate here since it's handled by the transition
      }
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }

  const handleButtonClick = async () => {
    if (!label || !onScreenChange || disabled) return
    
    // Dil değiştirme butonu (tek buton ile toggle)
    if (label === t('languages.languageToggle')) {
      // Mevcut dil ES ise EN'e geç, aksi takdirde ES'e geç
      const newLanguage = currentLanguage === 'es' ? 'en' : 'es'
      changeLanguage(newLanguage)
      return
    }
    
    // Geriye dönük uyumluluk için eski dil butonları
    if (label === t('languages.english') || label === 'EN') {
      changeLanguage('en')
      return
    }
    
    if (label === t('languages.spanish') || label === 'ES') {
      changeLanguage('es')
      return
    }
    
    // State Machine Pattern - Handle button actions through state transitions
    if (currentScreen) {
      const context: ActionContext = {
        dispatch,
        onScreenChange,
        currentAmount: currentAmount ?? undefined,
        transactionType: transactionType ?? undefined,
        user: user ?? undefined,
        handleTransaction
      }
      
      await navigationService.executeTransition(currentScreen, label, context, t)
    }
  }

  // Determine if button should be disabled
  const shouldDisable = () => {
    if (!label || disabled) return true
    
    // Dil butonları her zaman aktif
    if (label === t('languages.languageToggle') ||
        label === t('languages.english') || label === 'EN' || 
        label === t('languages.spanish') || label === 'ES') {
      return false
    }
    
    if (label === t('buttons.confirm')) {
      return !currentAmount || parseFloat(currentAmount) <= 0 || isLoading
    }
    return false
  }
  
  return (
    <div className={cn("relative flex items-center", className)}>
      <Button
        variant="sidebar"
        disabled={shouldDisable()}
        onClick={handleButtonClick}
        data-testid={testId || (label ? `atm-button-${label.toLowerCase().replace(/\s+/g, '-')}` : `atm-button-${side}`)}
      >
        {/* Button is visually empty - labels will be positioned with CSS */}
      </Button>
      
      {/* Connection between button and screen */}
      <Connection side={side} variant="button-screen" />
      
      {/* Label positioned to appear in screen area */}
      {label && (
        <span 
          className={cn(
            "absolute top-1/2 transform -translate-y-1/2 text-text-white text-button whitespace-nowrap pointer-events-none",
            side === 'left' ? 'left-full ml-8' : 'right-full mr-8'
          )}
          data-testid={`atm-label-${label.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {side === 'left' && <Connection side="left" variant="label-edge" />}
          {label}
          {side === 'right' && <Connection side="right" variant="label-edge" />}
        </span>
      )}
    </div>
  )
}

export default ATMButton