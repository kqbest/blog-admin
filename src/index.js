import React from 'react'
import ReactDOM from 'react-dom'
import Main from './pages/main'
import 'antd/dist/antd.css'
import './static/css/common.css'
import 'es6-promise-always'
import Api from './api'
import Utils from './utils/index'

React.$api = Api
React.$utils = Utils

ReactDOM.render(
  // <React.StrictMode>
    <Main />,
  // </React.StrictMode>,
  document.getElementById('root')
)
