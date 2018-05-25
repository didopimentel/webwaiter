import { combineReducers } from 'redux';
import { authentication } from './establishmentAuthReducer';
import { tableAuthentication } from './tableReducer'
import { alert } from './alertReducer';
import { order, dishes, categories } from './menuReducer';

const rootReducer = combineReducers({
  authentication,
  tableAuthentication,
  alert,
  order,
  dishes,
  categories
});

export default rootReducer;
