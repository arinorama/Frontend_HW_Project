import React, { Suspense, lazy } from 'react'
import type { ScreenType } from '../types'
import type { User } from '../features/authSlice'
import LoadingScreen from '../components/atoms/LoadingScreen/LoadingScreen'
import MainMenuScreen from '../components/screens/MainMenuScreen/MainMenuScreen'

// Loading fallback component
const ScreenLoadingFallback = () => <LoadingScreen />

// Critical screen - load immediately (no lazy loading for initial screen)
import WelcomeScreen from '../components/screens/WelcomeScreen/WelcomeScreen'

// Lazy loaded screens (non-critical)
const PinEntryScreen = lazy(() => import('../components/screens/PinEntryScreen/PinEntryScreen'))
const BalanceScreen = lazy(() => import('../components/screens/BalanceScreen/BalanceScreen'))
const WithdrawScreen = lazy(() => import('../components/screens/WithdrawScreen/WithdrawScreen'))
const DepositScreen = lazy(() => import('../components/screens/DepositScreen/DepositScreen'))

// Screen Handler Type
export type ScreenHandlers = {
  onScreenChange: (screen: ScreenType) => void
}

// Screen Context Type
export type ScreenContext = {
  isAuthenticated: boolean
  user: User | null
  handlers: ScreenHandlers
}

// Screen Render Service - Handles component rendering and lazy loading
export class ScreenRenderService {
  // Track preloaded screens
  private static preloadedScreens = new Set<ScreenType>()

  private static unauthorizedFallback(
    context: ScreenContext,
    fallbackScreen: ScreenType = 'welcome'
  ) {
    context.handlers.onScreenChange(fallbackScreen)
    return <WelcomeScreen />
  }

  private static requireAuth(context: ScreenContext, component: React.ReactElement) {
    if (!context.isAuthenticated || !context.user) {
      return this.unauthorizedFallback(context)
    }
    return component
  }

  // Screen Mapping Configuration
  private static screenMap: Record<ScreenType, (context: ScreenContext) => React.ReactElement> = {
    welcome: () => <WelcomeScreen />, // No lazy loading for welcome screen
    
    'pin-entry': (context) => (
      <PinEntryScreen 
        onSuccess={() => context.handlers.onScreenChange('main-menu')}
      />
    ),
    
    'main-menu': (context) => {
      if (!context.isAuthenticated || !context.user) {
        return this.unauthorizedFallback(context)
      }
      return <MainMenuScreen user={context.user} />
    },
    
    balance: (context) => this.requireAuth(context, <BalanceScreen />),
    
    withdraw: (context) => this.requireAuth(context, <WithdrawScreen />),
    
    deposit: (context) => this.requireAuth(context, <DepositScreen />)
  }

  /**
   * Renders the appropriate screen based on screen type and context with lazy loading
   */
  static render(screenType: ScreenType, context: ScreenContext): React.ReactElement {
    const renderer = this.screenMap[screenType]
    
    if (!renderer) {
      console.warn(`Unknown screen type: ${screenType}, falling back to welcome`)
      return this.screenMap.welcome(context) // Welcome screen is not lazy loaded
    }
    
    // Welcome screen doesn't need Suspense since it's not lazy loaded
    if (screenType === 'welcome') {
      return renderer(context)
    }
    
    // Check if screen is preloaded to avoid showing loading indicator
    const isPreloaded = this.preloadedScreens.has(screenType)
    
    if (isPreloaded) {
      // Screen is already preloaded, render directly without Suspense fallback
      return (
        <Suspense fallback={null}>
          {renderer(context)}
        </Suspense>
      )
    }
    
    // Other screens are lazy loaded, wrap with Suspense and loading fallback
    return (
      <Suspense fallback={<ScreenLoadingFallback />}>
        {renderer(context)}
      </Suspense>
    )
  }

  /**
   * Get available screens (useful for navigation)
   */
  static getAvailableScreens(): ScreenType[] {
    return Object.keys(this.screenMap) as ScreenType[]
  }

  /**
   * Check if screen requires authentication
   */
  static requiresAuth(screenType: ScreenType): boolean {
    const authRequiredScreens: ScreenType[] = ['main-menu', 'balance', 'withdraw', 'deposit']
    return authRequiredScreens.includes(screenType)
  }

  /**
   * Get next logical screen based on current state
   */
  static getNextScreen(
    currentScreen: ScreenType, 
    context: ScreenContext, 
    action?: string
  ): ScreenType {
    if (!context.isAuthenticated && this.requiresAuth(currentScreen)) {
      return 'welcome'
    }

    // Action-based navigation logic could be added here
    switch (action) {
      case 'logout':
        return 'welcome'
      case 'main-menu':
        return context.isAuthenticated ? 'main-menu' : 'welcome'
      default:
        return currentScreen
    }
  }

  /**
   * Preload screens for better performance
   * Call this after initial app load or user authentication
   */
  static async preloadScreens(screens: ScreenType[] = []): Promise<void> {
    const screensToPreload = screens.length > 0 ? screens : this.getAvailableScreens()
    
    try {
      const preloadPromises = screensToPreload.map(async (screenType) => {
        // Skip already preloaded screens
        if (this.preloadedScreens.has(screenType)) {
          return
        }
        
        // Trigger the lazy import to preload the component
        switch (screenType) {
          case 'welcome':
            // Welcome screen is already loaded (not lazy), mark as preloaded
            this.preloadedScreens.add(screenType)
            break
          case 'pin-entry':
            await import('../components/screens/PinEntryScreen/PinEntryScreen')
            this.preloadedScreens.add(screenType)
            break
          case 'balance':
            await import('../components/screens/BalanceScreen/BalanceScreen')
            this.preloadedScreens.add(screenType)
            break
          case 'withdraw':
            await import('../components/screens/WithdrawScreen/WithdrawScreen')
            this.preloadedScreens.add(screenType)
            break
          case 'deposit':
            await import('../components/screens/DepositScreen/DepositScreen')
            this.preloadedScreens.add(screenType)
            break
        }
      })
      
      await Promise.all(preloadPromises)
      console.log('Screens preloaded successfully:', screensToPreload.filter(s => this.preloadedScreens.has(s)))
    } catch (error) {
      console.warn('Screen preloading failed:', error)
    }
  }

  /**
   * Preload screens progressively based on user interaction
   */
  static async preloadOnUserAction(currentScreen: ScreenType): Promise<void> {
    let screensToPreload: ScreenType[] = []
    
    switch (currentScreen) {
      case 'welcome':
        // User is on welcome, likely to enter PIN next
        screensToPreload = ['pin-entry']
        break
      case 'pin-entry':
        // User entering PIN, will see main menu next
        screensToPreload = ['main-menu']
        break
      case 'main-menu':
        // User on main menu, might check balance or withdraw (most common)
        screensToPreload = ['balance', 'withdraw']
        break
      default:
        // Don't preload if we're already on a transaction screen
        return
    }
    
    await this.preloadScreens(screensToPreload)
  }

  /**
   * Preload commonly used screens after authentication
   */
  static async preloadAuthenticatedScreens(): Promise<void> {
    const authScreens: ScreenType[] = ['main-menu', 'balance', 'withdraw', 'deposit']
    await this.preloadScreens(authScreens)
  }
}

export default ScreenRenderService