import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@picocss/pico'
import { TaskContextProvider } from './context/task.jsx'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}>
    <TaskContextProvider>
      <Router>
        <App />
      </Router>
    </TaskContextProvider>
  </GoogleReCaptchaProvider>

)
