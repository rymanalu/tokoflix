const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')

const app = express()
const port = process.env.PORT || 5000

app.use(serveStatic(path.join(__dirname, 'dist')))
app.listen(port)
