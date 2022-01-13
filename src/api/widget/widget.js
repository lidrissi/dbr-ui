import { useQuery, useMutation, useQueryClient } from 'react-query'
import { BACKEND_API_RESOURCES } from 'constants/resources'
import { HEADERS } from 'helpers/headers'
import axios from '../axios'

export function useWidgets() {
  const options = {
    method: BACKEND_API_RESOURCES.widgets.get.method,
    headers: HEADERS,
    url: `${BACKEND_API_RESOURCES.widgets.get.resource}`,
  }
  return useQuery(
    ['widgets'],
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

export function useAddWidget() {
  const queryClient = useQueryClient()

  return useMutation(
    (payload) => {
      const options = {
        method: BACKEND_API_RESOURCES.dashboard.AddDashboardsWidget.method,
        headers: HEADERS,
        data: payload.widget,
        url: BACKEND_API_RESOURCES.dashboard.AddDashboardsWidget.resource + "/" + payload.id,
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
      onSuccess: () => {
        queryClient.invalidateQueries('widget')
        queryClient.invalidateQueries('dashboardWidgets')
      },
    },
  )
}


export function useAddImageWidget() {
  const queryClient = useQueryClient()

  return useMutation(
    (payload) => {
      const options = {
        headers: { ...HEADERS, "Content-Type": "multipart/form-data", },
      }

      const formData = new FormData();
      Object.keys(payload.widget).forEach(key => {
        formData.append(key, payload.widget[key])
      })
      if (payload.file instanceof File) {
        formData.append('file', payload.file, payload.file.name)
      }

      const url = BACKEND_API_RESOURCES.dashboard.AddDashboardsWidget.resource + "/" + payload.id
      return axios.put(url, formData, options)
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          return err
        })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('widget')
        queryClient.invalidateQueries('dashboardWidgets')
      },
    },
  )
}

export function useUpdateWidget() {
  const queryClient = useQueryClient()

  return useMutation(
    (payload) => {
      const options = {
        method: BACKEND_API_RESOURCES.dashboard.updateDashboardsWidget.method,
        headers: HEADERS,
        data: payload.widget,
        url: BACKEND_API_RESOURCES.dashboard.updateDashboardsWidget.resource + "/" + payload.id,
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
      onSuccess: () => {
        queryClient.invalidateQueries('dashboardWidgets')
        queryClient.refetchQueries('widgets', {
          force: true,
        })
      },
    },
  )
}

export function usePublishWidget() {
  return useMutation(
    (id) => {
      const options = {
        method: BACKEND_API_RESOURCES.widgets.publish.method,
        headers: HEADERS,
        url: BACKEND_API_RESOURCES.widgets.publish.resource + '/' + id,
      }
      return axios(options)
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          return err
        })
    },
  )
}

export function useUnPublishWidget() {
  return useMutation(
    (id) => {
      const options = {
        method: BACKEND_API_RESOURCES.widgets.unPublish.method,
        headers: HEADERS,
        url: BACKEND_API_RESOURCES.widgets.unPublish.resource + '/' + id,
      }
      return axios(options)
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          return err
        })
    },
  )
}


export function useDeleteWidget() {
  const queryClient = useQueryClient()

  return useMutation(
    (id) => {
      const options = {
        method: BACKEND_API_RESOURCES.widgets.delete.method,
        headers: HEADERS,
        url: BACKEND_API_RESOURCES.widgets.delete.resource + '/' + id,
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
      onSuccess: () => queryClient.invalidateQueries('widgets'),
    },
  )
}

