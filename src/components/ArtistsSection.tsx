import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopArtists, searchArtists, Artist } from '../api/lastfm';

interface ArtistsSectionProps {
  searchQuery?: string;
}

const ArtistsSection: React.FC<ArtistsSectionProps> = ({ searchQuery = '' }) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtists = async (query: string = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const artistsData = query ? await searchArtists(query) : await getTopArtists();
      setArtists(artistsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load artists');
      console.error('Error in fetchArtists:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists(searchQuery);
  }, [searchQuery]);


  const getArtistGenres = (artist: Artist): string[] => {
    return ['music', 'artist'];
  };

  if (loading) {
    return (
      <section className="section">
        <h2>Artists</h2>
        <div className="loading">Loading artists...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <h2>Artists</h2>
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={() => fetchArtists(searchQuery)} className="retry-btn">
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <h2>Artists</h2>
      {artists.length === 0 ? (
        <div className="no-results">
          No artists found{searchQuery && ` for "${searchQuery}"`}
        </div>
      ) : (
        <div className="artists-grid">
          {artists.map((artist, index) => (
            <Link 
              to={`/artist/${encodeURIComponent(artist.name)}`} 
              key={`${artist.name}-${index}`} 
              className="artist-card-link"
            >
              <div className="artist-card">
                <div className="artist-name">{artist.name}</div>
                <div className="artist-genres">
                  {getArtistGenres(artist).join(' • ')}
                </div>
                {artist.listeners && (
                  <div className="artist-listeners">
                    {parseInt(artist.listeners).toLocaleString()} listeners
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default ArtistsSection;