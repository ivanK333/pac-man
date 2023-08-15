import React, { useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { Routes, Route } from 'react-router'
import Profile from './components/Profile/Profile'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
