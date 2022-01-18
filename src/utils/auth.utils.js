import { useKeycloak } from '@react-keycloak/web'
import { loadData, removeData, saveData } from './localStorage.utils'

export const getBaseUrl = () => {
  const { protocol, hostname, port } = window.location
  return `${protocol}//${hostname}${port ? `:${port}` : ''}/"ROOT_PATH_PREFIX"`
}

const TOKEN = 'token'
const USER = 'user'

export const loadUser = () => loadData(USER)

export const saveUser = (user) => {
  saveData(USER, user)
}

export const removeUser = () => {
  removeData(USER)
}

export const saveToken = (token) => {
  saveData(TOKEN, token)
}

export const loadToken = () =>
  window.accessToken ? `Bearer ${window.accessToken}` : undefined
