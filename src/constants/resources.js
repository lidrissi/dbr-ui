/**
 * Backend API end points
 */

const BACKEND_API_URL = 'http://localhost:3005'
const BACKEND_API_NAME = 'api'
const BACKEND_SOCKET_API_URL = process.env.REACT_APP_SOCKET_API_HOST
const BACKEND_API_RESOURCES = {
  auth: {
    signin: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/signin`,
      secured: true,
    },
  },
  customer: {
    get: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/customer/`,
      secured: true,
    },
  },
  user: {
    getAll: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/users`,
      secured: true,
    },
    permissions: {
      get: {
        method: 'GET',
        resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/user/permissions`,
        secured: true,
      },
    },
    nodes: {
      get: {
        method: 'GET',
        resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/user/nodes`,
        secured: true,
      },
    },
  },
  widgets: {
    get: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/widgets`,
      secured: false,
    },
    add: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/widget`,
      secured: true,
    },
    addApplicationParam: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/applicationParam`,
      secured: false,
    },
    getApplicationParams: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/applicationParams`,
      secured: false,
    },
    publish: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/publishWidget`,
      secured: false,
    },
    unPublish: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/unPublishWidget`,
      secured: false,
    },
    delete: {
      method: 'DELETE',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/widget`,
      secured: false,
    }
  },
  stWidgets: {
    get: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/stWidgets`,
      secured: false,
    },
    find: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/stWidget/`,
      secured: false,
    },
    add: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/stWidget`,
      secured: false,
    },
    delete: {
      method: 'DELETE',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/stWidget`,
      secured: false,
    },
    edit: {
      method: 'PUT',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/stWidget/`,
      secured: false,
    },
    addUser: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/stWidget/addUser`,
      secured: false,
    },
    removeUser: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/stWidget/removeUser`,
      secured: false,
    }
  },
  applicationParam: {
    edit: {
      method: 'PUT',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/applicationParam`,
      secured: false,
    },
    delete: {
      method: 'DELETE',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/applicationParam`,
      secured: false,
    },
    detail: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/applicationParam`,
      secured: false,
    }
  },
  filter: {
    getAll: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/filters`,
      secured: false,
    },
    get: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/filter`,
      secured: false,
    },
    add: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/filter`,
      secured: false,
    },
    update: {
      method: 'PUT',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/filter`,
      secured: false,
    },
    delete: {
      method: 'DELETE',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/filter`,
      secured: false,
    }
  },
  filterType: {
    getAll: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/filtersType`,
      secured: false,
    },
    get: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/filterType`,
      secured: false,
    },
    add: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/filterType`,
      secured: false,
    },
    update: {
      method: 'PUT',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/filterType`,
      secured: false,
    },
    delete: {
      method: 'DELETE',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/filterType`,
      secured: false,
    }
  },
  dashboard: {
    get: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/dashboards`,
      secured: false,
    },
    edit: {
      method: 'PUT',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/dashboard`,
      secured: false,
    },
    add: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/dashboard`,
      secured: false,
    },
    delete: {
      method: 'DELETE',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/dashboard`,
      secured: false,
    },
    getDashboardsWitgets: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/dashboard`,
      secured: false,
    },
    getDefaultDashboard: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/default/dashboard`,
      secured: false,
    },
    AddDashboardsWidget: {
      method: 'PUT',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/dashboardWidgets`,
      secured: false,
    },
    updateDashboardsWidget: {
      method: 'PUT',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/updateDashboardWidgets`,
      secured: false,
    },
    setDashboardToDefault: {
      method: 'PUT',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/setDashboardToDefault`,
      secured: false,
    },
    duplicate: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/dashboard/duplicate`,
      secured: false,
    },
    share: {
      createPublicLink: {
        method: 'PUT',
        resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/dashboard/createPublicLink`,
        secured: false,
      },
      getDashboard: {
        method: 'GET',
        resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/dashboard/publicPath`,
        secured: false,
      },
    },
  },
  dashboards: {
    get: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/dashboards`,
      secured: true,
    },
  },
  nodes: {
    get: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/nodes`,
      secured: true,
    },
    add: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/nodes`,
      secured: true,
    },
    edit: {
      method: 'PUT',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/nodes`,
      secured: true,
    },
    delete: {
      method: 'DELETE',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/nodes`,
      secured: true,
    },
    editTree: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/nodes/editTree`,
      secured: true,
    },
    stratification: {
      get: {
        method: 'GET',
        resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/nodes/stratification`,
        secured: true,
      },
      edit: {
        method: 'POST',
        resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/nodes/stratification`,
        secured: true,
      },
    },
  },
  datasource: {
    get: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/datasources`,
      secured: false,
    },
    edit: {
      method: 'PUT',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/datasource`,
      secured: false,
    },
    add: {
      method: 'POST',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/datasource`,
      secured: false,
    },
    delete: {
      method: 'DELETE',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/datasource`,
      secured: false,
    },
    test: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/datasource/test`,
      secured: false,
    },
    fetchQuery: {
      method: 'GET',
      resource: `${BACKEND_API_URL}/${BACKEND_API_NAME}/datasource/fetchQuery`,
      secured: false,
    },
  }
}

export { BACKEND_API_URL, BACKEND_API_RESOURCES, BACKEND_SOCKET_API_URL }
