import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import App from './App'
import './index.css'

// Full Stack Open Part 7, exercises 7.9-7.21
// Redux store and React Router wrap the whole app;
// the backend is the Part 4 bloglist API on port 3003.

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
