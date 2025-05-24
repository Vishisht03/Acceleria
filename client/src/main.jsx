import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth-context'
import InstructorProvider from './context/instructor-context'
import StudentProvider from './context/student-context'
import { ThemeProvider } from './components/ThemeProvider'

// redux store
import store from './redux/store';
import { Provider } from 'react-redux';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <InstructorProvider>
        <StudentProvider>
          <ThemeProvider>
            <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </StudentProvider>
      </InstructorProvider>
    </AuthProvider>
  </BrowserRouter>
)
