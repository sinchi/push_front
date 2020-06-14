import axios from '../../api/axios';

const { token } = sessionStorage.getItem('authUser')
  ? JSON.parse(sessionStorage.getItem('authUser'))
  : '';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const postCompany = (url, company) => {
  return axios
    .post(url, company)
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