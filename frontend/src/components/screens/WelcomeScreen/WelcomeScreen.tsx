import { WelcomeScreenLayout } from '../../layouts'
import { useTranslation } from '../../../hooks/useTranslation'

const WelcomeScreen = () => {
  const { t } = useTranslation()

  return (
    <WelcomeScreenLayout 
      instruction={t('screens.welcome')}
      screenTestId="atm-screen-welcome"
    />
  )
}

export default WelcomeScreen