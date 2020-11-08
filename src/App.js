import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.scss'
import Landing from './pages/landing'
import Home from './pages/home'

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Route exact path="/welcome" component={Landing} /> */}
        <Route exact path="/" component={Home} />
      </Router>
    </div>
  )
}

export default App
