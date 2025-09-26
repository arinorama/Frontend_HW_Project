import { MainMenuScreenLayout } from '../../layouts'
import { useTranslation } from '../../../hooks/useTranslation'
import type { User } from '../../../features/authSlice'

interface MainMenuScreenProps {
  user: User
}

const MainMenuScreen = ({ user }: MainMenuScreenProps) => {
  const { t } = useTranslation()

  return (
    <MainMenuScreenLayout
      welcomeMessage={t('ui.welcome', { name: user.name })}
      screenTestId="atm-screen-main-menu"
    />
  )
}

export default MainMenuScreen