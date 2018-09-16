import { adminConstants } from '../constants/adminConstants'

export function stations(state = {}, action) {
    switch(action.type) {
      case adminConstants.GET_ALL_STATIONS_REQUEST:
        return {
          requesting: action.requesting
        }
      case adminConstants.GET_ALL_STATIONS_SUCCESS:
        return {
          ...state,
          requesting: false,
          stations: action.stations
        }
      case adminConstants.GET_ALL_STATIONS_FAILURE:
        return {}
      default:
        return state;
    }
  }
