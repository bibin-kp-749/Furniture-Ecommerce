import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './App/Store/store.jsx'
import { Toaster } from 'react-hot-toast'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster position="bottom" reverseOrder={false}/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
