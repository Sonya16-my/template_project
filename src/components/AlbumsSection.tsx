import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchAlbums, Album } from '../api/lastfm';

interface AlbumsSectionProps {
  searchQuery?: string;
}

const AlbumsSection: React.FC<AlbumsSectionProps> = ({ searchQuery = '' }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbums = async (query: string = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const albumsData = query ? await searchAlbums(query) : [];
      setAlbums(albumsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load albums');
      console.error('Error in fetchAlbums:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums(searchQuery);
  }, [searchQuery]);

  if (loading) {
    return (
      <section className="section">
        <h2>Albums</h2>
        <div className="loading">Loading albums...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <h2>Albums</h2>
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={() => fetchAlbums(searchQuery)} className="retry-btn">
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <h2>Albums</h2>
      {albums.length === 0 ? (
        <div className="no-results">
          No albums found{searchQuery && ` for "${searchQuery}"`}
        </div>
      ) : (
        <div className="albums-grid">
          {albums.map((album, index) => (
            <Link 
              to={`/album/${encodeURIComponent(album.name)}`} 
              key={`${album.name}-${album.artist}-${index}`} 
              className="album-card-link"
            >
              <div className="album-card">
                {album.image && album.image[2]?.['#text'] && (
                  <img 
                    src={album.image[2]['#text']} 
                    alt={album.name}
                    className="album-image"
                  />
                )}
                <div className="album-info">
                  <div className="album-name">{album.name}</div>
                  <div className="album-artist">{album.artist}</div>
                  {album.listeners && (
                    <div className="album-listeners">
                      {parseInt(album.listeners).toLocaleString()} listeners
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

export default AlbumsSection;