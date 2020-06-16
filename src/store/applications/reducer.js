// @flow
import {
  ADD_APPLICATION_SUCCESS,
  ADD_APPLICATION_FAILED,
  ADD_APPLICATION,
  LIST_APPLICATIONS,
  LIST_APPLICATIONS_SUCCESS,
  LIST_APPLICATIONS_FAILED,
  GET_APPLICATION_BY_ID,
  GET_APPLICATION_BY_ID_SUCCESS,
  GET_APPLICATION_BY_ID_FAILED,
  EDIT_APPLICATION_FAILED,
  EDIT_APPLICATION_SUCCESS,
  EDIT_APPLICATION,
  DELETE_APPLICATION,
  DELETE_APPLICATION_SUCCESS,
  DELETE_APPLICATION_FAILED,
} from './actionTypes';

const INIT_STATE = {
  error: '',
  loading: false,
};

const Company = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_APPLICATION:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ADD_APPLICATION_SUCCESS:
      state = {
        ...state,
        company: action.payload,
        loading: false,
      };
      break;
    case ADD_APPLICATION_FAILED:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    case EDIT_APPLICATION:
      state = {
        ...state,
        loading: true,
      };
      break;
    case EDIT_APPLICATION_SUCCESS:
      state = {
        ...state,
        company: action.payload,
        loading: false,
      };
      break;
    case EDIT_APPLICATION_FAILED:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    case DELETE_APPLICATION:
      state = {
        ...state,
        loading: true,
      };
      break;
    case DELETE_APPLICATION_SUCCESS:
      state = {
        ...state,
        company: action.payload,
        loading: false,
      };
      break;
    case DELETE_APPLICATION_FAILED:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    case LIST_APPLICATIONS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LIST_APPLICATIONS_SUCCESS:
      state = {
        ...state,
        loading: false,
        applications: action.payload,
      };
      break;
    case LIST_APPLICATIONS_FAILED:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;
    case GET_APPLICATION_BY_ID:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_APPLICATION_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        application: action.payload,
      };
      break;
    case GET_APPLICATION_BY_ID_FAILED:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }

  return state;
};

export default Company;
