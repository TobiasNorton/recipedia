import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/home';
import Recipe from './pages/recipe';
import NavigationBar from './components/navigation-bar';
import SearchResults from './pages/search-results';

function App() {
  // See the browser's built-in URLSearchParams API.
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Route exact path="/" component={Home} />
        <Route path="/recipes/:recipeId" component={Recipe} />
        {/* TODO: This smells; do it the right way */}
        <Route path="/search-results" component={SearchResults} />
      </Router>
    </div>
  );
}

export default App;
