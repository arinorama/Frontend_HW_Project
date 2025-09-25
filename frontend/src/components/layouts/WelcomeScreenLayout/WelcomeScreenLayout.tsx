import React from 'react'
import { ErrorMessage } from '../../atoms'
import { ScreenInstruction } from '../../molecules'

interface WelcomeScreenLayoutProps {
  children?: React.ReactNode
  instruction: string | React.ReactNode
  error?: string | null
  errorTestId?: string
  screenTestId?: string
}

const WelcomeScreenLayout = ({ 
  children, 
  instruction, 
  error, 
  errorTestId = "screen-error-message",
  screenTestId = "atm-screen"
}: WelcomeScreenLayoutProps) => {
  return (
    <div className="text-center text-white h-full flex flex-col" data-testid={screenTestId}>
      <div className="pt-8">
        <ScreenInstruction className="text-xl font-semibold">
          {instruction}
        </ScreenInstruction>
      </div>

      {/* Geri kalan alan için flex-1 kullanıyoruz */}
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

export default WelcomeScreenLayout