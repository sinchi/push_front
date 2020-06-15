import axios from '../../api/axios';

const initAuthorization = () => {
  const { token } = sessionStorage.getItem('authUser')
    ? JSON.parse(sessionStorage.getItem('authUser'))
    : '';
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const postApplication = (url, application) => {
  initAuthorization();
  return axios
    .post(url, application)
    .then((response) => {
      console.log({ response });
      if (response.data.errors) {
        throw new Error(JSON.stringify(response.data.errors));
      }
      if (response.status === 401 || response.status === 500)
        throw response.status;

      return response.data;
    })
    .catch((err) => {
      throw err.request.status;
    });
};

const deleteApplication = (url) => {
  initAuthorization();
  return axios
    .delete(url)
    .then((response) => {
      if (response.data.errors) {
        throw new Error(JSON.stringify(response.data.errors));
      }
      if (response.status === 401 || response.status === 500)
        throw response.status;

      return response.data;
    })
    .catch((err) => {
      throw err.request.status;
    });
};

const getListApplications = (url) => {
  initAuthorization();
  return axios
    .get(url)
    .then((response) => {
      if (response.status === 401 || response.status === 500)
        throw response.data;
      return response.data;
    })
    .catch((error) => {
      throw error.message;
    });
};

const getApplicationById = (url, id) => {
  initAuthorization();
  return axios
    .get(url, {
      params: {
        id,
      },
    })
    .then((response) => {
      if (response.status === 401 || response.status === 500)
        throw response.data;
      return response.data[0];
    })
    .catch((error) => {
      throw error.message;
    });
};

export {
  postApplication,
  getListApplications,
  getApplicationById,
  deleteApplication,
};
