const API_CONFIG = {
  BASE_URL: 'https://ws.audioscrobbler.com/2.0/',
  API_KEY: 'cb085b2fed7e70f6ab4fc3244091fac8',
  FORMAT: 'json'
} as const;

export interface Artist {  
  name: string;
  listeners?: string;
  mbid?: string;
  url: string;
  image?: Array<{
    '#text': string;
    size: string;
  }>;
}

export interface Track {  
  name: string;
  artist: {
    name: string;
  };
  listeners?: string;
  url: string;
  image?: Array<{
    '#text': string;
    size: string;
  }>;
}

export interface Album {
  name: string;
  artist: string;
  listeners?: string;
  mbid?: string;
  url: string;
  image?: Array<{
    '#text': string;
    size: string;
  }>;
}

interface TopArtistsResponse {
  artists: {
    artist: Artist[];
    '@attr': {
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

interface TopTracksResponse {
  tracks: {
    track: Track[];
    '@attr': {
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

interface SearchArtistsResponse {
  results: {
    artistmatches: {
      artist: Artist[];
    };
  };
}

interface SearchTracksResponse {
  results: {
    trackmatches: {
      track: Track[];
    };
  };
}

interface SearchAlbumsResponse {
  results: {
    albummatches: {
      album: Album[];
    };
  };
}

/**
 * Generic function to make API requests to Last.fm
 * @param method - API method to call
 * @param additionalParams - Additional parameters for the request
 * @returns Promise with the response data
 * @throws Error if the request fails or API returns error
 */
async function makeApiRequest<T>(
  method: string, 
  additionalParams: Record<string, string> = {}
): Promise<T> {
  const params = new URLSearchParams({
    method,
    api_key: API_CONFIG.API_KEY,
    format: API_CONFIG.FORMAT,
    ...additionalParams
  });

  const url = `${API_CONFIG.BASE_URL}?${params}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`Last.fm API error: ${data.message}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch data from Last.fm: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching data');
  }
}

/**
 * Fetches top artists from Last.fm
 * @param limit - Number of artists to fetch (default: 8)
 * @param page - Page number (default: 1)
 * @returns Promise with array of top artists
 */
export async function getTopArtists(limit: number = 8, page: number = 1): Promise<Artist[]> {
  try {
    const data = await makeApiRequest<TopArtistsResponse>('chart.gettopartists', {
      limit: limit.toString(),
      page: page.toString()
    });
    
    return data.artists.artist;
  } catch (error) {
    console.error('Error fetching top artists:', error);
    throw error;
  }
}

/**
 * Fetches top tracks from Last.fm
 * @param limit - Number of tracks to fetch (default: 6)
 * @param page - Page number (default: 1)
 * @returns Promise with array of top tracks
 */
export async function getTopTracks(limit: number = 6, page: number = 1): Promise<Track[]> {
  try {
    const data = await makeApiRequest<TopTracksResponse>('chart.gettoptracks', {
      limit: limit.toString(),
      page: page.toString()
    });
    
    return data.tracks.track;
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    throw error;
  }
}

/**
 * Searches for artists by name
 * @param query - Search query
 * @param limit - Number of results to return (default: 8)
 * @returns Promise with array of matching artists
 */
export async function searchArtists(query: string, limit: number = 8): Promise<Artist[]> {
  if (!query.trim()) {
    return getTopArtists(limit);
  }

  try {
    const data = await makeApiRequest<SearchArtistsResponse>('artist.search', {
      artist: query,
      limit: limit.toString()
    });
    
    return data.results.artistmatches.artist;
  } catch (error) {
    console.error('Error searching artists:', error);
    throw error;
  }
}

/**
 * Searches for tracks by name
 * @param query - Search query
 * @param limit - Number of results to return (default: 6)
 * @returns Promise with array of matching tracks
 */
export async function searchTracks(query: string, limit: number = 6): Promise<Track[]> {
  if (!query.trim()) {
    return getTopTracks(limit);
  }

  try {
    const data = await makeApiRequest<SearchTracksResponse>('track.search', {
      track: query,
      limit: limit.toString()
    });
    
    return data.results.trackmatches.track;
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw error;
  }
}

/**
 * Searches for albums by name
 * @param query - Search query
 * @param limit - Number of results to return (default: 8)
 * @returns Promise with array of matching albums
 */
export async function searchAlbums(query: string, limit: number = 8): Promise<Album[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const data = await makeApiRequest<SearchAlbumsResponse>('album.search', {
      album: query,
      limit: limit.toString()
    });
    
    return data.results.albummatches.album;
  } catch (error) {
    console.error('Error searching albums:', error);
    throw error;
  }
}