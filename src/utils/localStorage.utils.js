export const loadData = (key) => {
  try {
    const serializedData = localStorage.getItem(key)
    if (serializedData == null) {
      return undefined
    }
    return JSON.parse(serializedData)
  } catch (err) {
    return undefined
  }
}
export const saveData = (key, data) => {
  try {
    const serializedData = JSON.stringify(data)
    localStorage.setItem(key, serializedData)
  } catch (err) {
    // ignore write
  }
}

export const removeData = (key) => {
  localStorage.removeItem(key)
}
