import { tableConstants } from '../constants/tableConstants';

let table = JSON.parse(localStorage.getItem('table'));
const initialState = table
                     ? { tableAccess: { loggedInTable: true, table }}
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
        tableAccess: action.tableAccess
      };
    case tableConstants.LOGIN_FAILURE:
      return {};
    case tableConstants.LOGOUT:
      return {};
    default:
      return state
  }
}
