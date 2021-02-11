import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Router, Switch, Route, Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import { history } from './_helpers/history'
import login from './components/login'
import home from './components/home'

function App() {
  return (
    <Router history={history}>
      <div>
        <nav></nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={['/', '/login']} component={login} />
            <Route exact path={'/home'} component={home} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
