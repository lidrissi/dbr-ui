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

export const removeToken = () => {
  removeData(TOKEN)
}

export const isLoggedIn = () => loadToken() !== undefined

export const logout = () => {
  removeToken()
  removeUser()
}

export const useAuthenticatedUser = () => {
  const { keycloak } = useKeycloak();

  const userInfo = keycloak.tokenParsed

  return {
    userId: userInfo.sub,
    isAdmin: keycloak.hasRealmRole('admin')
  }
}

export const getUserNameForAvatar = (firstName, lastName = '') => {
  let fName = (firstName) ? firstName.split(' ') : "";

  if (fName.length >= 3) {
    return extractFirstLetter(fName, 3);
  }

  let lName = (lastName) ? lastName.split(' ') : "";
  return extractFirstLetter(fName.concat(lName), 3);
};

function extractFirstLetter(arrayStr) {
  let result = '';

  for (let i = 0; i < arrayStr.length; i++) {
    if (arrayStr[i] !== undefined) {
      result += arrayStr[i].substring(0, 1);
    }
  }

  return result.toUpperCase().replace(/[^A-Z+]/g, "");
}
