import { useState } from 'react'
import type { ScreenType } from '../../../types'
import { getScreenConfigs } from '../../../types'
import { useTranslation } from '../../../hooks/useTranslation'
import { useAppSelector } from '../../../hooks/redux'
import { selectUser } from '../../../features/authSlice'
import ATMSidebar from '../../organisms/ATMSidebar/ATMSidebar'
import ATMScreen from '../../organisms/ATMScreen/ATMScreen'
import ATMBrandHeader from '../../organisms/ATMBrandHeader/ATMBrandHeader'
import { CardTypeIndicator } from '../../atoms'

const ATMLayout = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome')
  const { t } = useTranslation()
  const user = useAppSelector(selectUser)
  
  const currentConfig = getScreenConfigs(t)[currentScreen]

  return (
    <div className="flex flex-col items-center flex-grow w-full" data-testid="atm-layout-main">
      {/* ATM Brand Header - Machine width + 100px */}
      <ATMBrandHeader
        data-testid="atm-brand-header-main"
      />
      
      {/* ATM Machine Frame */}
      <div className="atm-machine-frame" data-testid="atm-machine-frame">
        {/* Card Type Indicator Area - Her zaman aynı yükseklikte */}
        <div className="mb-4 flex justify-center h-12"> {/* Sabit yükseklik */}
          {user && (
            <CardTypeIndicator 
              activeCardType={user.cardType}
              showAll={true}
              className="scale-75"
              data-testid="atm-card-type-indicator"
            />
          )}
        </div>
        
        {/* ATM Main Grid Layout */}
        <div className="atm-grid" data-testid="atm-layout-grid">
          
          {/* Left Sidebar Buttons */}
          <ATMSidebar 
            side="left" 
            buttons={currentConfig.left}
            currentScreen={currentScreen}
            onScreenChange={setCurrentScreen}
            data-testid="atm-sidebar-left"
          />
          
          {/* Main Screen Area */}
          <ATMScreen 
            currentScreen={currentScreen}
            onScreenChange={setCurrentScreen}
            data-testid="atm-screen-main"
          />
          
          {/* Right Sidebar Buttons */}
          <ATMSidebar 
            side="right" 
            buttons={currentConfig.right}
            currentScreen={currentScreen}
            onScreenChange={setCurrentScreen}
            data-testid="atm-sidebar-right"
          />
        </div>
      </div>
    </div>
  )
}

export default ATMLayout