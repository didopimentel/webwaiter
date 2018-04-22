import { establishmentConstants } from '../constants/establishmentConstants';
import { establishmentService } from '../services/establishmentService'

let establishment = JSON.parse(localStorage.getItem('establishment'));
const initialState = establishment ? { loggedIn: true, establishment } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case establishmentConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        establishmentCode: action.establishmentCode
      };
    case establishmentConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        establishmentAccess: action.establishmentAccess
      };
    case establishmentConstants.LOGIN_FAILURE:
      return {};
    case establishmentConstants.LOGOUT:
      return {};
    default:
      return state
  }
}
