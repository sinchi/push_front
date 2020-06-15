import {
  ADD_APPLICATION,
  ADD_APPLICATION_SUCCESS,
  ADD_APPLICATION_FAILED,
  LIST_APPLICATIONS,
  LIST_APPLICATIONS_SUCCESS,
  LIST_APPLICATIONS_FAILED,
  GET_APPLICATION_BY_ID,
  GET_APPLICATION_BY_ID_SUCCESS,
  GET_APPLICATION_BY_ID_FAILED,
  EDIT_APPLICATION,
  EDIT_APPLICATION_SUCCESS,
  EDIT_APPLICATION_FAILED,
  DELETE_APPLICATION_SUCCESS,
  DELETE_APPLICATION,
  DELETE_APPLICATION_FAILED,
} from './actionTypes';

/////////// ADD APPLICATION \\\\\\\\\\\\\\
export const addApplication = (application, history) => ({
  type: ADD_APPLICATION,
  payload: {
    application,
    history,
  },
});

export const addApplicationSuccess = (application) => ({
  type: ADD_APPLICATION_SUCCESS,
  payload: application,
});

export const addApplicationFailed = (error) => ({
  type: ADD_APPLICATION_FAILED,
  payload: error,
});

/////////// END ADD APPLICATION \\\\\\\\\\\\\\

/////////// EDIT APPLICATION \\\\\\\\\\\\\\
export const editApplication = (application, history, id) => ({
  type: EDIT_APPLICATION,
  payload: {
    application,
    history,
    id,
  },
});

export const editApplicationSuccess = (application) => ({
  type: EDIT_APPLICATION_SUCCESS,
  payload: application,
});

export const editApplicationFailed = (error) => ({
  type: EDIT_APPLICATION_FAILED,
  payload: error,
});

/////////// END EDIT APPLICATION \\\\\\\\\\\\\

/////////// DELETE APPLICATION \\\\\\\\\\\\\\
export const deleteApplication = (id, history) => ({
  type: DELETE_APPLICATION,
  payload: {
    history,
    id,
  },
});

export const deleteApplicationSuccess = (application) => ({
  type: DELETE_APPLICATION_SUCCESS,
  payload: application,
});

export const deleteApplicationFailed = (error) => ({
  type: DELETE_APPLICATION_FAILED,
  payload: error,
});

/////////// END DELETE APPLICATION \\\\\\\\\\\\\\

export const listApplications = () => ({
  type: LIST_APPLICATIONS,
});

export const listApplicationsSuccess = (applications) => ({
  type: LIST_APPLICATIONS_SUCCESS,
  payload: applications,
});

export const listApplicationsFailed = (error) => ({
  type: LIST_APPLICATIONS_FAILED,
  payload: error,
});

export const getApplicationById = (id) => ({
  type: GET_APPLICATION_BY_ID,
  payload: id,
});

export const getApplicationByIdSuccess = (application) => ({
  type: GET_APPLICATION_BY_ID_SUCCESS,
  payload: application,
});

export const getApplicationByIdFailed = (error) => ({
  type: GET_APPLICATION_BY_ID_FAILED,
  payload: error,
});
