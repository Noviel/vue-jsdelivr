import axios from 'axios';

axios.defaults.baseURL = 'https://data.jsdelivr.com/v1';
axios.defaults.proxy = {
  host: 'data.jsdelivr.com',
  protocol: 'https',
  port: 8080,
};
axios.defaults.headers = {
  'Content-Type': 'application/json',
};

export async function getPackageByName(name, pagination) {
  try {
    const query =
      pagination && typeof pagination.limit !== 'undefined' && typeof pagination.page !== 'undefined'
        ? `?limit=${pagination.limit}&page=${pagination.page}`
        : '';
    const response = await axios.get(`/package/npm/${name}${query}`);
    return { data: response.data };
  } catch (e) {
    return e.response.data;
  }
}

export async function getPackageDetails(name, version, structure = 'flat') {
  try {
    const response = await axios.get(`/package/npm/${name}@${version}/${structure}`);
    return { data: response.data };
  } catch (e) {
    return e.response.data;
  }
}
