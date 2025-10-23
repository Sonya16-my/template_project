import React, { useState } from 'react'; 
import { useLocation } from 'react-router-dom';
import ArtistsSection from '../components/ArtistsSection';
import TracksSection from '../components/TracksSection';
import AlbumsSection from '../components/AlbumsSection';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const [activeTab, setActiveTab] = useState<'artists' | 'albums' | 'tracks'>('artists');

  return (
    <div className="main-content">
      <div className="container">
        <div className="page-header search-page-header">
          <h1 className="page-title search-page-title">Search results for "{query}"</h1>
        </div>
        <div className="search-tabs">
          <div className="search-tabs-header">
            <h2 className="search-tabs-title">Top Results</h2>
            <nav className="search-tabs-nav">
              <button 
                className={`search-tab ${activeTab === 'artists' ? 'active' : ''}`}
                onClick={() => setActiveTab('artists')}
              >
                Artists
              </button>
              <button 
                className={`search-tab ${activeTab === 'albums' ? 'active' : ''}`}
                onClick={() => setActiveTab('albums')}
              >
                Albums
              </button>
              <button 
                className={`search-tab ${activeTab === 'tracks' ? 'active' : ''}`}
                onClick={() => setActiveTab('tracks')}
              >
                Tracks
              </button>
            </nav>
          </div>
          <div className="search-tab-content">
            {activeTab === 'artists' && (
              <ArtistsSection searchQuery={query} />
            )}

            {activeTab === 'albums' && (
              <AlbumsSection searchQuery={query} />
            )}

            {activeTab === 'tracks' && (
              <TracksSection searchQuery={query} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;