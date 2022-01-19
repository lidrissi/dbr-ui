import axios from '../axios'
import { BACKEND_API_RESOURCES, getApiUrl } from 'constants/resources'

export function getDashboardFilter(dashboardId) {
  const options = {
    method: BACKEND_API_RESOURCES.filter.getAll.method,
    url: `${getApiUrl()}/${BACKEND_API_RESOURCES.filter.getAll.resource}/${dashboardId}`,
  }
  return axios(options)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
}

