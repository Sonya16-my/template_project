import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArtistPage from './pages/ArtistPage';
import SearchPage from './pages/SearchPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/artist/:artistName" component={ArtistPage} />
          <Route path="/track/:trackName" component={ArtistPage} /> {}
          <Route path="/search" component={SearchPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;