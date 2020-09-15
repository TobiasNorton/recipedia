import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div>
      <h1>Welcome, Non-Authenticated User!</h1>
      <Link to="/home">Click here to pretend to log in</Link>
    </div>
  )
}

export default Landing
