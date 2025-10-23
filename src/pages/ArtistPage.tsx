import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ArtistPage: React.FC = () => {
  const { artistName } = useParams<{ artistName: string }>();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(false);
  }, [artistName]);

  if (loading) {
    return (
      <div className="main-content">
        <div className="container">
          <div className="loading">Loading artist info...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="container">
        <Link to="/" className="back-link">← Back to home</Link>
        <div className="artist-detail">
          <h1>{decodeURIComponent(artistName || '')}</h1>
          <div className="artist-info">
            <p>Artist details will be displayed here</p>
            {}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;