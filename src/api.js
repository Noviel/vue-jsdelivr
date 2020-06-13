import axios from 'axios';

axios.defaults.baseURL = 'https://data.jsdelivr.com/v1/package/npm';
axios.defaults.headers = {
  'Content-Type': 'application/json',
};
/* Proxy helps mitigate CORS issues */
axios.defaults.proxy = {
  host: 'data.jsdelivr.com',
  protocol: 'https',
  port: 8080,
};

export async function getPackageVersions(name, pagination) {
  try {
    const query =
      pagination && typeof pagination.limit !== 'undefined' && typeof pagination.page !== 'undefined'
        ? `?limit=${pagination.limit}&page=${pagination.page}`
        : '';
    const { data } = await axios.get(`/${name}${query}`);
    return { data };
  } catch (e) {
    return e.response.data;
  }
}

export async function getPackageFiles(name, version, structure = 'flat') {
  try {
    const { data } = await axios.get(`/${name}@${version}/${structure}`);
    return { data };
  } catch (e) {
    return e.response.data;
  }
}

export async function getPackageUsageStats(name, version) {
  try {
    const { data } = await axios.get(`/${name}@${version}/stats`);
    return { data };
  } catch (e) {
    return e.response.data;
  }
}
