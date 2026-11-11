import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

// Full Stack Open Part 6 -- the Redux store (store.js) is
// provided to the whole app with react-redux's Provider.

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
