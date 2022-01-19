import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from '../axios'
import { BACKEND_API_RESOURCES, getApiUrl } from 'constants/resources'

export function getWidgetNodes(widget) {

  const options = {
    method: BACKEND_API_RESOURCES.nodes.get.method,
    url: `${getApiUrl()}/${BACKEND_API_RESOURCES.nodes.get.resource}?widget=${widget}`,
  }

  return axios(options)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
}