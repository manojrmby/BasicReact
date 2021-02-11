const { REACT_APP_API_URL } = process.env

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }
  return fetch(`${REACT_APP_API_URL}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      console.log(user)
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))

      return user
    })
}
function logout() {
  localStorage.removeItem('user')
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        //location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  })
}
export const userService = {
  login,
  logout,
}
