import { sessionInformationReducer } from '../constants/sessionInformationReducer'

initialState = {}

export function SessionInformation (state = initialState, action) {
    const { tableNumber, billNumber } = action
    switch (action.type) {
        case sessionInformationReducer.SESSIONINFORMATION_GET_TABLE_NUMBER_REQUEST: {
            return {
                requesting: true
            }
        }
        case sessionInformationReducer.SESSIONINFORMATION_GET_TABLE_NUMBER_SUCCESS: {
            return {
                ...state,
                requesting: false,
                tableNumber
            }
        }
        case sessionInformationReducer.SESSIONINFORMATION_GET_TABLE_NUMBER_REQUEST: {
            return {
                requesting: false
            }
        }
        case sessionInformationReducer.SESSIONINFORMATION_GET_BILL_NUMBER_REQUEST: {
          return {
              requesting: true
          }
        }
        case sessionInformationReducer.SESSIONINFORMATION_GET_BILL_NUMBER_SUCCESS: {
            return {
                ...state,
                requesting: false,
                billNumber
            }
        }
        case sessionInformationReducer.SESSIONINFORMATION_GET_BILL_NUMBER_FAILURE: {
            return {
                requesting: false
            }
        }
            
    }
}