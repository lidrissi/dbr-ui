import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from '../axios'
import { BACKEND_API_RESOURCES } from 'constants/resources'
import { HEADERS } from 'helpers/headers'

export function useWidgetNodes(widget) {

  const options = {
    method: BACKEND_API_RESOURCES.nodes.get.method,
    headers: HEADERS,
    url: BACKEND_API_RESOURCES.nodes.get.resource + "?widget=" + widget,
  }
  return useQuery(
    ['widgetNodes', { widget }],
    () => {
      return axios(options)
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          return err
        })
    },
    {
      cacheTime: 1000 * 60 * 120,
      suspense: true,
    },
  )
}

export function useEditNode() {
  const queryClient = useQueryClient()

  return useMutation(
    (node) => {
      const options = {
        method: BACKEND_API_RESOURCES.nodes.edit.method,
        headers: HEADERS,
        data: node,
        url: BACKEND_API_RESOURCES.nodes.edit.resource + "/" + node._id,
      }
      return axios(options)
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          return err
        })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('node'),
    },
  )
}

export function useDeleteNode() {
  const queryClient = useQueryClient()

  return useMutation(
    (id) => {
      const options = {
        method: BACKEND_API_RESOURCES.nodes.delete.method,
        headers: HEADERS,
        url: `${BACKEND_API_RESOURCES.nodes.delete.resource}/${id}`,
      }
      return axios(options)
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          return err
        })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('nodes'),
    }
  )
}

export function useAddNode() {
  const queryClient = useQueryClient()

  return useMutation(
    (node) => {
      const options = {
        method: BACKEND_API_RESOURCES.nodes.add.method,
        headers: HEADERS,
        data: node,
        url: BACKEND_API_RESOURCES.nodes.add.resource,
      }
      return axios(options)
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          return err
        })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('node'),
    },
  )
}

export function useEditNodesTree() {
  const queryClient = useQueryClient()

  return useMutation(
    (nodes) => {
      const options = {
        method: BACKEND_API_RESOURCES.nodes.editTree.method,
        headers: HEADERS,
        data: nodes,
        url: BACKEND_API_RESOURCES.nodes.editTree.resource,
      }
      return axios(options)
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          return err
        })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('node'),
    },
  )
}