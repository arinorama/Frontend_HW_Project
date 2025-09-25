import React from 'react'
import { AccountInfo, ErrorMessage } from '../../atoms'
import { ScreenInstruction } from '../../molecules'

interface ATMScreenLayoutProps {
  children?: React.ReactNode
  instruction: string | React.ReactNode
  error?: string | null
  errorTestId?: string
  screenTestId?: string
  showAccountInfo?: boolean
}

const ATMScreenLayout = ({ 
  children, 
  instruction, 
  error, 
  errorTestId = "screen-error-message",
  screenTestId = "atm-screen",
  showAccountInfo = true
}: ATMScreenLayoutProps) => {
  return (
    <div className="text-center text-white h-full flex flex-col" data-testid={screenTestId}>
      {showAccountInfo && <AccountInfo />}
      
      <div className="flex-1 flex flex-col justify-center">
        <ScreenInstruction>
          {instruction}
        </ScreenInstruction>

        {children}
      </div>

      <ErrorMessage 
        message={error} 
        testId={errorTestId} 
      />
    </div>
  )
}

export default ATMScreenLayout