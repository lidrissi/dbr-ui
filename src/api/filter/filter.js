import axios from '../axios'
import { BACKEND_API_RESOURCES } from 'constants/resources'
import { HEADERS } from 'helpers/headers'

export function getDashboardFilter(dashboardId) {
  const options = {
    method: BACKEND_API_RESOURCES.filter.getAll.method,
    headers: HEADERS,
    url: `${BACKEND_API_RESOURCES.filter.getAll.resource}/${dashboardId}`,
  }
  return axios(options)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
}

