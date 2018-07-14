import { tableConstants } from '../constants/tableConstants';

let token = JSON.parse(localStorage.getItem('token'));
const initialState = token
                     ? { loggedInTable: true, token: token }
                     : {};

export function tableAuthentication(state = initialState, action) {
  switch (action.type) {
    case tableConstants.LOGIN_REQUEST:
        return {
        loggingIn: true,
        table: action.table
      };
    case tableConstants.LOGIN_SUCCESS:
      return {
        loggedInTable: true,
        token: action.token
      };
    case tableConstants.LOGIN_FAILURE:
      return {};
    case tableConstants.LOGOUT:
      return {};
    default:
      return state
  }
}
