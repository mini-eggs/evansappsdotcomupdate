
require('import-export')
require('babel-core/register')({presets: ['es2015', 'react']})

const http = require('http')
const fs = require('fs')
const path = require('path')
const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const renderToString = ReactDOMServer.renderToString
const ReactRouter = require('react-router')
const app = express()
const config = {port: process.env.PORT || 8080}
const match = ReactRouter.match
const RouterContext = ReactRouter.RouterContext
const routes = require('../src/routes').default()

app.server = http.createServer(app)
app.use(express.static('../build'))

app.get('/static/css/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', req.url))
})

app.get('/static/js/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', req.url))
})

app.get('*', (req, res) => {
  fs.readFile(path.join(__dirname, '../build', 'index.html'), 'utf8', (err, data) => {
    if (err) {
      res.status(404).send('Not found')
    }
    else {
      match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          res.status(500).send(error.message)
        }
        else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        }
        else if (renderProps) {
          const ReactApp = renderToString(React.createElement(RouterContext, renderProps))
          const RenderedApp = data.replace('{{SSR}}', ReactApp)
          res.status(200).send(RenderedApp)
        }
        else {
          res.status(404).send('Not found')
        }
      })
    }
  })
})

app.server.listen(config.port)
console.log(`Started on port ${app.server.address().port}`)
module.exports = app
