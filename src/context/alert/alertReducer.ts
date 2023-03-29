import { Reducer } from 'react'

interface AlertState {
  visible: boolean
  // add more properties here if needed
}

type AlertAction =
  | { type: typeof SHOW_ALERT, payload?: AlertState }
  | { type: typeof HIDE_ALERT }
  | { type: 'DEFAULT' }

const SHOW_ALERT = 'SHOW_ALERT'
const HIDE_ALERT = 'HIDE_ALERT'

const handlers: Record<string, Reducer<AlertState, AlertAction>> = {
    //@ts-ignore
  [SHOW_ALERT]: (state, { payload }) => ({ ...payload, visible: true }),
  [HIDE_ALERT]: (state) => ({ ...state, visible: false }),
  DEFAULT: (state) => state,
}

const alertReducer: Reducer<AlertState, AlertAction> = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}

export default alertReducer