import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { VariableProvider } from './context/variables.context.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <VariableProvider>
      <App />
    </VariableProvider>
  </Provider>,
)
