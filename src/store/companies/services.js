import axios from '../../api/axios';

const { token } = sessionStorage.getItem('authUser')
  ? JSON.parse(sessionStorage.getItem('authUser'))
  : '';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const postCompany = (url, companie) => {
  return axios
    .post(url, companie)
    .then((response) => {
      if (response.status === 401 || response.status === 500)
        throw response.data;
      return response.data;
    })
    .catch((err) => {
      throw err.message;
    });
};

const getListCompanies = (url) => {
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

export { postCompany, getListCompanies };
