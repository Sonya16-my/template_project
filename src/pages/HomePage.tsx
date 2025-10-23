import React from 'react';
import ArtistsSection from '../components/ArtistsSection';
import TracksSection from '../components/TracksSection';

const HomePage: React.FC = () => {
  return (
    <div className="main-content">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Music</h1>
        </div>
        <ArtistsSection />
        <TracksSection />
      </div>
    </div>
  );
};

export default HomePage;