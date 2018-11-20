import { sessionInformationConstants } from '../constants/sessionInformationConstants'

export function sessionInformation(state = {}, action) {
  const { tableNumber, billNumber } = action
  switch (action.type) {
    case sessionInformationConstants.GET_TABLE_NUMBER_REQUEST: {
      return {
        requesting: true
      }
    }
    case sessionInformationConstants.GET_TABLE_NUMBER_SUCCESS: {
      return {
        ...state,
        requesting: false,
        tableNumber
      }
    }
    case sessionInformationConstants.GET_TABLE_NUMBER_REQUEST: {
      return {
        requesting: false
      }
    }
    case sessionInformationConstants.GET_BILL_NUMBER_REQUEST: {
      return {
        requesting: true
      }
    }
    case sessionInformationConstants.GET_BILL_NUMBER_SUCCESS: {
      return {
        ...state,
        requesting: false,
        billNumber
      }
    }
    case sessionInformationConstants.GET_BILL_NUMBER_FAILURE: {
      return {
        requesting: false
      }
    }
    default:
      return {
        ...state
      }
  }
}