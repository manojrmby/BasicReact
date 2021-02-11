import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { userActions } from '../_actions'
import { authHeader } from '../_helpers'

const Login = (props) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const { username, password } = inputs
  const dispatch = useDispatch()
  const location = useLocation()
  const loggingIn = useSelector((state) => state.authentication.loggingIn)
  useEffect(() => {
    dispatch(userActions.logout())
  }, [dispatch])
  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs((inputs) => ({ ...inputs, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    dispatch(userActions.logout())
    if (username && password) {
      const { TO } = location.state || { TO: { pathname: '/home' } }
      dispatch(userActions.login(username, password, TO))
    }
  }

  return (
    <div className="col-lg-8 offset-lg-2">
      <h2>Login Page</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            className={
              'form-control' + (submitted && !username ? ' is-invalid' : '')
            }
          />
          {submitted && !username && (
            <div className="invalid-feedback">Username is required</div>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={
              'form-control' + (submitted && !password ? ' is-invalid' : '')
            }
          />
          {submitted && !password && (
            <div className="invalid-feedback">Password is required</div>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-primary">
            {loggingIn && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
export default Login
