import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

// Full Stack Open Part 7, exercises 7.1-7.8
// The router wraps the whole app so that Routes, Link
// and useNavigate work in App.jsx.

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
