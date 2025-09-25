import { useEffect } from 'react'
import { Title, PinInput, ErrorMessage } from '../../atoms'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { authenticateUser, selectAuthLoading, selectAuthError, clearError } from '../../../features/authSlice'
import { useTranslation } from '../../../hooks/useTranslation'
import ScreenRenderService from '../../../services/screenRenderService'

type PinEntryScreenProps = {
  onSuccess?: () => void
}

const PinEntryScreen = ({ onSuccess }: PinEntryScreenProps) => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectAuthLoading)
  const error = useAppSelector(selectAuthError)
  const { t } = useTranslation()

  const handlePinComplete = async (pin: string) => {
    const result = await dispatch(authenticateUser(pin))
    
    if (authenticateUser.fulfilled.match(result)) {
      // Only preload main-menu screen since user will definitely see it
      ScreenRenderService.preloadScreens(['main-menu']).catch(console.warn)
      onSuccess?.()
    }
    // Error handling is done in the slice
  }

  // Clear error when component mounts
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  return (
    <div className="text-center" data-testid="atm-screen-pin-entry">
      <Title 
        variant="screen" 
        data-testid="atm-screen-pin-entry-title"
      >
        {isLoading ? t('screens.authenticating') : t('screens.enterYourPin')}
      </Title>
      
      <div className="mt-8">
        <PinInput
          onPinComplete={handlePinComplete}
          variant="default"
          size="large"
          disabled={isLoading}
          autoFocus={true}
          error={error}
          data-testid="atm-pin-input"
        />
      </div>

      <ErrorMessage 
        message={error} 
        className="mt-4 text-atm-error text-base"
        testId="pin-error-message" 
      />

      {!isLoading && (
        <div className="mt-6 text-white/70 text-xs">
          {t('demo.demoPins')}
        </div>
      )}
    </div>
  )
}

export default PinEntryScreen