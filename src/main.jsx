import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@picocss/pico'
import { TaskContextProvider } from './context/task.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <TaskContextProvider>
    <App />
  </TaskContextProvider>,
)
