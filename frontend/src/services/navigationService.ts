import type { ScreenType } from '../types'
import { 
  clearPin, 
  clearUIState 
} from '../features/uiSlice'
import { logout } from '../features/authSlice'

// State Machine Pattern Types
export type ActionTrigger = 
  | 'ENTER_PIN' 
  | 'CANCEL' 
  | 'CLEAR' 
  | 'BALANCE' 
  | 'WITHDRAW' 
  | 'DEPOSIT' 
  | 'EXIT' 
  | 'RE_ENTER_PIN' 
  | 'MAIN_MENU' 
  | 'CONFIRM'

export interface StateTransition {
  from: ScreenType
  to: ScreenType
  trigger: ActionTrigger
  condition?: (context: ActionContext) => boolean
  action?: (context: ActionContext) => unknown
}

export interface ActionContext {
  dispatch: (action: { type: string; payload?: unknown }) => { type: string; payload?: unknown }
  onScreenChange: (screen: ScreenType) => void
  currentAmount?: string
  transactionType?: string
  user?: { id: string; [key: string]: unknown }
  handleTransaction?: () => Promise<void>
}

/**
 * Navigation Service
 * Manages all screen transitions and navigation logic for the ATM application
 */
export class NavigationService {
  private static instance: NavigationService
  
  private transitions: StateTransition[] = [
    // Welcome screen transitions
    { 
      from: 'welcome', 
      to: 'pin-entry', 
      trigger: 'ENTER_PIN' 
    },
    
    // Pin entry transitions
    { 
      from: 'pin-entry', 
      to: 'welcome', 
      trigger: 'CANCEL' 
    },
    { 
      from: 'pin-entry', 
      to: 'pin-entry', 
      trigger: 'CLEAR', 
      action: (ctx) => ctx.dispatch(clearPin()) 
    },
    
    // Main menu transitions
    { 
      from: 'main-menu', 
      to: 'balance', 
      trigger: 'BALANCE' 
    },
    { 
      from: 'main-menu', 
      to: 'withdraw', 
      trigger: 'WITHDRAW' 
    },
    { 
      from: 'main-menu', 
      to: 'deposit', 
      trigger: 'DEPOSIT' 
    },
    { 
      from: 'main-menu', 
      to: 'welcome', 
      trigger: 'EXIT',
      action: (ctx) => {
        ctx.dispatch(logout())
        ctx.dispatch(clearUIState())
      }
    },
    { 
      from: 'main-menu', 
      to: 'pin-entry', 
      trigger: 'RE_ENTER_PIN' 
    },
    
    // Balance screen transitions
    { 
      from: 'balance', 
      to: 'main-menu', 
      trigger: 'MAIN_MENU' 
    },
    
    // Withdraw screen transitions
    { 
      from: 'withdraw', 
      to: 'main-menu', 
      trigger: 'MAIN_MENU',
      action: (ctx) => ctx.dispatch(clearUIState())
    },
    { 
      from: 'withdraw', 
      to: 'main-menu', 
      trigger: 'CANCEL',
      action: (ctx) => ctx.dispatch(clearUIState())
    },
    { 
      from: 'withdraw', 
      to: 'balance', 
      trigger: 'CONFIRM',
      condition: (ctx) => Boolean(ctx.currentAmount && parseFloat(ctx.currentAmount) > 0),
      action: async (ctx) => {
        if (ctx.handleTransaction) {
          await ctx.handleTransaction()
        }
      }
    },
    
    // Deposit screen transitions  
    { 
      from: 'deposit', 
      to: 'main-menu', 
      trigger: 'MAIN_MENU',
      action: (ctx) => ctx.dispatch(clearUIState())
    },
    { 
      from: 'deposit', 
      to: 'main-menu', 
      trigger: 'CANCEL',
      action: (ctx) => ctx.dispatch(clearUIState())
    },
    { 
      from: 'deposit', 
      to: 'balance', 
      trigger: 'CONFIRM',
      condition: (ctx) => Boolean(ctx.currentAmount && parseFloat(ctx.currentAmount) > 0),
      action: async (ctx) => {
        if (ctx.handleTransaction) {
          await ctx.handleTransaction()
        }
      }
    },
  ]

  // Singleton pattern for global navigation service instance
  public static getInstance(): NavigationService {
    if (!NavigationService.instance) {
      NavigationService.instance = new NavigationService()
    }
    return NavigationService.instance
  }

  /**
   * Creates a mapping from button labels to action triggers
   * @param t Translation function
   * @returns Map of button labels to triggers
   */
  private createLabelTriggerMap(t: (key: string) => string): Map<string, ActionTrigger> {
    return new Map<string, ActionTrigger>([
      [t('buttons.enterPin'), 'ENTER_PIN'],
      [t('buttons.cancel'), 'CANCEL'],
      [t('buttons.clear'), 'CLEAR'],
      [t('buttons.balance'), 'BALANCE'],
      [t('buttons.withdraw'), 'WITHDRAW'],
      [t('buttons.deposit'), 'DEPOSIT'],
      [t('buttons.exit'), 'EXIT'],
      [t('buttons.reEnterPin'), 'RE_ENTER_PIN'],
      [t('buttons.mainMenu'), 'MAIN_MENU'],
      [t('buttons.confirm'), 'CONFIRM'],
    ])
  }

  /**
   * Gets the action trigger for a given button label
   * @param buttonLabel The button label
   * @param t Translation function
   * @returns ActionTrigger or null if not found
   */
  public getTriggerForLabel(buttonLabel: string, t: (key: string) => string): ActionTrigger | null {
    const labelTriggerMap = this.createLabelTriggerMap(t)
    return labelTriggerMap.get(buttonLabel) || null
  }

  /**
   * Finds a valid transition for the given parameters
   * @param currentScreen Current screen state
   * @param trigger Action trigger
   * @param context Action context for conditions
   * @returns StateTransition or null if not found
   */
  public findTransition(
    currentScreen: ScreenType, 
    trigger: ActionTrigger, 
    context: ActionContext
  ): StateTransition | null {
    return this.transitions.find(t => 
      t.from === currentScreen && 
      t.trigger === trigger &&
      (!t.condition || t.condition(context))
    ) || null
  }

  /**
   * Executes a state transition based on current screen and button label
   * @param currentScreen Current screen state
   * @param buttonLabel Button label that was clicked
   * @param context Action context
   * @param t Translation function
   * @returns Promise<ScreenType | null> - Next screen or null if no transition
   */
  public async executeTransition(
    currentScreen: ScreenType,
    buttonLabel: string,
    context: ActionContext,
    t: (key: string) => string
  ): Promise<ScreenType | null> {
    const trigger = this.getTriggerForLabel(buttonLabel, t)
    
    if (!trigger) {
      console.warn(`No trigger found for button label: ${buttonLabel}`)
      return null
    }

    const transition = this.findTransition(currentScreen, trigger, context)

    if (!transition) {
      console.warn(`No transition found from ${currentScreen} with trigger ${trigger}`)
      return null
    }

    // Execute action if present
    if (transition.action) {
      try {
        await transition.action(context)
      } catch (error) {
        console.error('Error executing transition action:', error)
        return null
      }
    }

    // Execute screen change
    context.onScreenChange(transition.to)
    
    // Log transition for debugging
    console.log(`State transition: ${currentScreen} -> ${transition.to} (${trigger})`)
    
    return transition.to
  }

  /**
   * Gets all possible transitions from a given screen
   * @param screen The screen to get transitions from
   * @returns Array of possible transitions
   */
  public getTransitionsFromScreen(screen: ScreenType): StateTransition[] {
    return this.transitions.filter(t => t.from === screen)
  }

  /**
   * Gets all possible destination screens from a given screen
   * @param screen The screen to get destinations from
   * @returns Array of possible destination screens
   */
  public getPossibleDestinations(screen: ScreenType): ScreenType[] {
    return this.getTransitionsFromScreen(screen).map(t => t.to)
  }

  /**
   * Validates if a transition is possible
   * @param from Source screen
   * @param to Destination screen
   * @param trigger Action trigger
   * @param context Action context for conditions
   * @returns boolean - true if transition is valid
   */
  public canTransition(
    from: ScreenType, 
    to: ScreenType, 
    trigger: ActionTrigger, 
    context: ActionContext
  ): boolean {
    const transition = this.transitions.find(t => 
      t.from === from && 
      t.to === to && 
      t.trigger === trigger
    )
    
    if (!transition) return false
    
    // Check condition if exists
    if (transition.condition) {
      return transition.condition(context)
    }
    
    return true
  }

  /**
   * Adds a new transition to the state machine
   * @param transition The transition to add
   */
  public addTransition(transition: StateTransition): void {
    this.transitions.push(transition)
  }

  /**
   * Removes transitions matching the criteria
   * @param from Source screen
   * @param trigger Action trigger
   */
  public removeTransition(from: ScreenType, trigger: ActionTrigger): void {
    this.transitions = this.transitions.filter(t => 
      !(t.from === from && t.trigger === trigger)
    )
  }
}

// Export singleton instance for easy access
export const navigationService = NavigationService.getInstance()