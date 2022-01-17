import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from '../axios'
import { BACKEND_API_RESOURCES } from 'constants/resources'
import { HEADERS } from 'helpers/headers'

export function getWidgetNodes(widget) {

  const options = {
    method: BACKEND_API_RESOURCES.nodes.get.method,
    headers: HEADERS,
    url: BACKEND_API_RESOURCES.nodes.get.resource + "?widget=" + widget,
  }

  return axios(options)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
}