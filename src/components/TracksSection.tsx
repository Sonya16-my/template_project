import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopTracks, searchTracks, Track } from '../api/lastfm';

interface TracksSectionProps {
  searchQuery?: string;
}

const TracksSection: React.FC<TracksSectionProps> = ({ searchQuery = '' }) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTracks = async (query: string = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const tracksData = query ? await searchTracks(query) : await getTopTracks();
      setTracks(tracksData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tracks');
      console.error('Error in fetchTracks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks(searchQuery);
  }, [searchQuery]);

  const getTrackGenres = (track: Track): string[] => {
    return ['music', 'track'];
  };

  if (loading) {
    return (
      <section className="section">
        <h2>Popular tracks</h2>
        <div className="loading">Loading tracks...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <h2>Popular tracks</h2>
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={() => fetchTracks(searchQuery)} className="retry-btn">
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <h2>Popular tracks</h2>
      {tracks.length === 0 ? (
        <div className="no-results">
          No tracks found{searchQuery && ` for "${searchQuery}"`}
        </div>
      ) : (
        <div className="tracks-list">
          {tracks.map((track, index) => (
            <Link
              to={`/track/${encodeURIComponent(track.name)}`}
              key={`${track.name}-${track.artist.name}-${index}`}
              className="track-item-link"
            >
              <div className="track-item">
                <div className="track-info">
                  <div className="track-title">{track.name}</div>
                  <div className="track-artist">{track.artist.name}</div>
                  <div className="track-genres">
                    {getTrackGenres(track).join(' - ')}
                  </div>
                  {track.listeners && (
                    <div className="track-listeners">
                      {parseInt(track.listeners).toLocaleString()} listeners
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default TracksSection;