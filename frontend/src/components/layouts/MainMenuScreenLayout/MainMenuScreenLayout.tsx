import React from 'react'
import { AccountInfo, ErrorMessage } from '../../atoms'

interface MainMenuScreenLayoutProps {
  children?: React.ReactNode
  welcomeMessage: string
  error?: string | null
  errorTestId?: string
  screenTestId?: string
}

const MainMenuScreenLayout = ({ 
  children,
  welcomeMessage,
  error,
  errorTestId = "screen-error-message",
  screenTestId = "atm-screen-main-menu"
}: MainMenuScreenLayoutProps) => {
  return (
    <div className="text-center text-white h-full flex flex-col" data-testid={screenTestId}>
      <AccountInfo />
      
      {/* Welcome area - positioned at top */}
      <div className="pt-8 pb-4">
        <h2 className="text-2xl mb-3">{welcomeMessage}</h2>
      </div>
      
      {/* Content area for menu items */}
      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>

      <ErrorMessage 
        message={error} 
        testId={errorTestId} 
      />
    </div>
  )
}

export default MainMenuScreenLayout