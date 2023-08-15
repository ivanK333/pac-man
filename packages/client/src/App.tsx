import { useEffect } from 'react'
import { LoginForm } from './pages/login/index.login'
import './App.css'

const SERVER_PORT = __SERVER_PORT__ || 3001
console.log('__SERVER_PORT__', __SERVER_PORT__)

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${SERVER_PORT}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      <LoginForm />
    </div>
  )
}

export default App
