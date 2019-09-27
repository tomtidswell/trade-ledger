import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'spectre.css'
import './style.scss'

import Company from './components/Company'
import Search from './components/Search'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/company/:id" component={Company} />
        <Route exact path="/" component={Search} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
