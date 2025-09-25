import { useAppSelector } from '../../../hooks/redux'
import { selectUser } from '../../../features/authSlice'
import { useTranslation } from '../../../hooks/useTranslation'

interface AccountInfoProps {
  className?: string
}

const AccountInfo = ({ className = "text-xs text-white/60" }: AccountInfoProps) => {
  const user = useAppSelector(selectUser)
  const { t } = useTranslation()

  if (!user) {
    return null
  }

  return (
    <div className={className}>
      {t('account.account')}: {user.name} • {user.cardType.toUpperCase()}
    </div>
  )
}

export default AccountInfo