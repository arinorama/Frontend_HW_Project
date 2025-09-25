import type { ScreenType } from '../../../types'
import { useAppSelector } from '../../../hooks/redux'
import { selectIsAuthenticated, selectUser } from '../../../features/authSlice'
import ScreenRenderService from '../../../services/screenRenderService'

type ATMScreenProps = {
  currentScreen: ScreenType
  onScreenChange: (screen: ScreenType) => void
  'data-testid'?: string
}

const ATMScreen = ({ currentScreen, onScreenChange, 'data-testid': testId }: ATMScreenProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)

  const renderScreen = () => {
    return ScreenRenderService.render(currentScreen, {
      isAuthenticated,
      user,
      handlers: { onScreenChange }
    })
  }

  return (
    <div 
      className="atm-screen" 
      data-testid={testId || `atm-screen-${currentScreen}`}
    >
      {renderScreen()}
    </div>
  )
}

export default ATMScreen