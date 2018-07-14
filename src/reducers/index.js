import { combineReducers } from 'redux';
import { authentication } from './establishmentAuthReducer';
import { tableAuthentication } from './tableReducer'
import { alert } from './alertReducer';
import { order, dishes, categories } from './menuReducer';
import { tables } from './staffReducer';
import { orders } from './orderReducer'
import { reducer as permissions } from 'react-redux-permissions'

const rootReducer = combineReducers({
  permissions,
  authentication,
  tableAuthentication,
  alert,
  tables,
  order,
  orders,
  dishes,
  categories
});

export default rootReducer;
