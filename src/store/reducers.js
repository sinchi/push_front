import { combineReducers } from 'redux';

// Front
import Layout from './layout/reducer';

// Authentication
import Login from './auth/login/reducer';
import Account from './auth/register/reducer';
import ForgetPassword from './auth/forgetpwd/reducer';

// Companies
import Companies from './companies/reducer';

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Companies,
});

export default rootReducer;
