import React from 'react';
import { Redirect } from 'react-router-dom';

// Authentication related pages
import Login from '../pages/Authentication/Login';
import Logout from '../pages/Authentication/Logout';
import Register from '../pages/Authentication/Register';
import ForgetPwd from '../pages/Authentication/ForgetPassword';

// Dashboard
import Dashboard from '../pages/Dashboard/index';

// Company
import Companies from '../pages/Companies';
// Application
import Applications from '../pages/Applications';

const authProtectedRoutes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/companies', component: Companies },
  { path: '/applications', component: Applications },

  // this route should be at the end of all other routes
  { path: '/', exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: '/logout', component: Logout },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgetPwd },
  { path: '/register', component: Register },
];

export { authProtectedRoutes, publicRoutes };
