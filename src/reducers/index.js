import { combineReducers } from 'redux';
import { authentication } from './establishmentAuthReducer';
import { tableAuthentication } from './tableReducer'
import { alert } from './alertReducer';
import { order } from './menuReducer';

const rootReducer = combineReducers({
  authentication,
  tableAuthentication,
  alert,
  order
});

export default rootReducer;
