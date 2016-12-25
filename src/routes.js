import React from 'react'
import {browserHistory, Router, Route, IndexRedirect} from 'react-router'
import Background from './components/background'
import Item from './components/item'
import Blog from './components/blog'

const Routes = props => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Background}>
        <IndexRedirect to="/page/home" />
        <Route path="/page/:page" type="page" component={Item} />
        <Route path="/post/:post" type="blogPost" component={Item} />
        <Route path="/blog" component={Blog} />
      </Route>
      <Route path="*">
        <IndexRedirect to="/" />
      </Route>
    </Router>
  )
}

export default Routes
