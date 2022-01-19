import axios from '../axios'
import { BACKEND_API_RESOURCES , getApiUrl} from 'constants/resources'

export function getDashboards() {
  const options = {
    method: BACKEND_API_RESOURCES.dashboard.get.method,
    url: `${getApiUrl()}/${BACKEND_API_RESOURCES.dashboard.get.resource}`,
  }
  return axios(options)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
}

export const getDashboardWidgets = (id) => {
  const options = {
    method: BACKEND_API_RESOURCES.dashboard.getDashboardsWitgets.method,
    url: `${getApiUrl()}/${BACKEND_API_RESOURCES.dashboard.getDashboardsWitgets.resource}` + "/" + id,
  }
  return axios(options)
    .then((res) => {
      return {
        name: res.data.name,
        description: res.data.description,
        widgets: res.data.widgets,
        layouts: res.data.layouts,
        appearance: res.data.appearance,
        share: res.data.share,
        role: res.data.role,
        owner: res.data.owner,
      }
    })
    .catch((err) => {
      return err
    })
}
