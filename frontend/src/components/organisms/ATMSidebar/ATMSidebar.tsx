import { cn } from '../../../lib/utils'
import type { ScreenType } from '../../../types'
import { ATMButton } from '../../molecules'

type ATMSidebarProps = {
  side: 'left' | 'right'
  buttons: (string | null)[]
  currentScreen?: ScreenType
  onScreenChange?: (screen: ScreenType) => void
  'data-testid'?: string
}

const ATMSidebar = ({ side, buttons, currentScreen, onScreenChange, 'data-testid': testId }: ATMSidebarProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col justify-end gap-2",
        side === 'left' ? 'items-end' : 'items-start'
      )}
      data-testid={testId}
    >
      {buttons.map((button, index) => (
        <ATMButton
          key={index}
          side={side}
          label={button}
          currentScreen={currentScreen}
          onScreenChange={onScreenChange}
          data-testid={button ? `atm-button-${button.toLowerCase().replace(/\s+/g, '-')}` : `atm-button-${side}-${index}`}
        />
      ))}
    </div>
  )
}

export default ATMSidebar