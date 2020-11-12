import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.scss'
import Home from './pages/home'
import Recipe from './pages/recipe'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/recipes/:recipeId" component={Recipe} />
      </Router>
    </div>
  )
}

export default App
