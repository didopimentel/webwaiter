import { combineReducers } from 'redux';
import { authentication } from './establishmentAuthReducer';
import { alert } from './alertReducer';

const rootReducer = combineReducers({
  authentication,
  alert,
  order
});

export default rootReducer;
