import { combineReducers } from 'redux';
import { authentication } from './establishmentAuthReducer';
import { tableAuthentication } from './tableReducer'
import { alert } from './alertReducer';
import { order, dishes, categories } from './menuReducer';
import { tables } from './staffReducer';
import { orders, billCustomer } from './orderReducer'
import { stations } from './adminReducer'
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
  billCustomer,
  categories,
  stations
});

export default rootReducer;
