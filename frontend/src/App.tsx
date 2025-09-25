import { useEffect } from 'react'
import ATMLayout from './components/layouts/ATMLayout/ATMLayout'
import ScreenRenderService from './services/screenRenderService'

function App() {
  // Minimal preloading strategy - only preload next likely screen
  useEffect(() => {
    // Only preload the most critical next screen (PIN entry)
    const preloadCritical = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          // Only preload PIN entry since it's the most likely next screen
          ScreenRenderService.preloadScreens(['pin-entry'])
        })
      } else {
        setTimeout(() => {
          ScreenRenderService.preloadScreens(['pin-entry'])
        }, 1000)
      }
    }

    preloadCritical()
  }, [])

  return (
    <div className="min-h-screen atm-bg flex flex-col items-center pt-atm-top-space pb-atm-bottom-space px-atm-horizontal" data-testid="atm-layout-root">
      <ATMLayout />
    </div>
  )
}

export default App
