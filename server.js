/*
 * @Author: LightYear
 * @Date: 2020-08-23 21:23:18
 * @LastEditors: LightYear
 * @LastEditTime: 2020-08-23 23:37:25
 * @FilePath: \ui\server.js
 */
const express = require('express')
const webpack = require('webpack')
const middle = require('webpack-dev-middleware')
const config = require('./webpack.config.js')

const app = express()
const compiler = webpack(config)

app.use(middle(compiler))

app.get('/user', (req, res) => {
  res.json({
    name: 'XXXX'
  })
})

app.listen(3000)