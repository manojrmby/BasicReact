import { userService } from '../_services'
import { userConstants } from '../_constants'
import { Form } from 'react-bootstrap'
import { history } from '../_helpers'

function login(username, password, TO) {
  return (dispatch) => {
    dispatch(request({ username }))
    userService.login(username, password).then((user) => {
      dispatch(success(user))
      history.push(TO)
    })
  }
  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user }
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user }
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error }
  }
}

function logout() {
  userService.logout()
  return { type: userConstants.LOGOUT }
}

export const userActions = {
  login,
  logout,
}
