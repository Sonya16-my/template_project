import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const history = useHistory();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery) {
      history.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    } else {
      history.push('/');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    history.push('/');
  };

  const handleGoHome = () => {
    history.push('/');
    setSearchQuery('');
  };

  const handleNavClick = (item: string) => {
    console.log(`Navigate to: ${item}`);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-top">
          <div className="header-left">
            <h1 className="logo" onClick={handleGoHome}>
              last.fm
            </h1>
            <nav className="main-nav">
              <button 
                className="nav-link"
                onClick={() => handleNavClick('Home')}
              >
                Home
              </button>
              <button 
                className="nav-link"
                onClick={() => handleNavClick('Live')}
              >
                Live
              </button>
              <button 
                className="nav-link"
                onClick={() => handleNavClick('Music')}
              >
                Music
              </button>
              <button 
                className="nav-link"
                onClick={() => handleNavClick('Charts')}
              >
                Charts
              </button>
              <button 
                className="nav-link"
                onClick={() => handleNavClick('Events')}
              >
                Events
              </button>
              <button 
                className="nav-link"
                onClick={() => handleNavClick('Features')}
              >
                Features
              </button>
            </nav>
          </div>
          <div className="header-right">
            <div className="user-section">
              <span className="username">Sign In</span>
              <div className="user-icon">👤</div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <form className="search-container" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search for music..." 
              className="search-input"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button type="submit" className="search-btn">Search</button>
            {searchQuery && (
              <button 
                type="button" 
                className="clear-btn"
                onClick={handleClearSearch}
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;