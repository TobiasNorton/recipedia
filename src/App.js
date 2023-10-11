import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/recipes/:recipeId" component={Recipe} />
          {/* TODO: Add search input */}
          <Route path="/search-results" component={SearchResults} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
