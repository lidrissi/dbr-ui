import axios from '../axios'
import { BACKEND_API_RESOURCES } from 'constants/resources'
import { HEADERS } from 'helpers/headers'

export const fetchDatasourceQuery = (datasource) => {
  delete datasource['queries']
  delete datasource['owner']
  delete datasource['share']

  const options = {
    method: BACKEND_API_RESOURCES.datasource.fetchQuery.method,
    headers: HEADERS,
    url: BACKEND_API_RESOURCES.datasource.fetchQuery.resource,
    params: datasource
  }

  return axios(options)
    .then((res) => {
      return res.data
    })
    .catch(() => {
      return []
    })
}
