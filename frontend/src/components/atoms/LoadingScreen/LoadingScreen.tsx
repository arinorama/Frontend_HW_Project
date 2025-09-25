import { useTranslation } from '../../../hooks/useTranslation'

const LoadingScreen = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center text-white animate-pulse" data-testid="screen-loading">
      <div className="text-2xl mb-4">{t('ui.loading')}</div>
      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  )
}

export default LoadingScreen