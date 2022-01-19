const getApiUrl = () => {
  let url = 'http://localhost:3005'
  switch (window.dbr_env) {
    case 'local':
      url = 'http://localhost:3005'
      break;
    case 'demo':
      url = 'http://10.16.128.43:3005'
      break;
    case 'sandbox':
      url = 'https://dbr-sandbox.um6p.ma/back'
      break;
  }
  return url
}

let BACKEND_API_URL = getApiUrl()

const BACKEND_API_NAME = 'api'
const BACKEND_SOCKET_API_URL = process.env.REACT_APP_SOCKET_API_HOST
const BACKEND_API_RESOURCES = {
  filter: {
    getAll: {
      method: 'GET',
      resource: `${BACKEND_API_NAME}/filters`,
      secured: false,
    },
    get: {
      method: 'GET',
      resource: `${BACKEND_API_NAME}/filter`,
      secured: false,
    },
  },
  dashboard: {
    get: {
      method: 'GET',
      resource: `${BACKEND_API_NAME}/dashboards`,
      secured: false,
    },
    getDashboardsWitgets: {
      method: 'GET',
      resource: `${BACKEND_API_NAME}/dashboard`,
      secured: false,
    },
  },
  dashboards: {
    get: {
      method: 'GET',
      resource: `${BACKEND_API_NAME}/dashboards`,
      secured: true,
    },
  },
  nodes: {
    get: {
      method: 'GET',
      resource: `${BACKEND_API_NAME}/nodes`,
      secured: true,
    },
  },
  datasource: {
    fetchQuery: {
      method: 'GET',
      resource: `${BACKEND_API_NAME}/datasource/fetchQuery`,
      secured: false,
    },
  }
}

export { BACKEND_API_URL, BACKEND_API_RESOURCES, BACKEND_SOCKET_API_URL, getApiUrl }
