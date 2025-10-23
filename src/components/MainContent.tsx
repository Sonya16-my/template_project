import React, { useState } from 'react';
import ArtistsSection from './ArtistsSection';
import TracksSection from './TracksSection';

const MainContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="main-content">
      <div className="container">
        <ArtistsSection searchQuery={searchQuery} />
        <TracksSection searchQuery={searchQuery} />
      </div>
    </main>
  );
};

export default MainContent;