export type DeezerArtistSummary = {
  id: number;
  name: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  type: 'artist';
};

export type DeezerAlbumSummary = {
  id: number;
  title: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  artist: DeezerArtistSummary;
  type: 'album';
};

export type DeezerTrack = {
  id: number;
  title: string;
  title_short: string;
  position: number;
  duration: number;
  preview: string;
  time_add?: number;
  artist: DeezerArtistSummary;
  album: {
    id: number;
    title: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
    cover_xl: string;
  };
};

export type DeezerPlaylist = {
  id: number;
  title: string;
  link: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
};

export type DeezerEditorialRelease = {
  id: number;
  title: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  release_date: string;
  artist: {
    id: number;
    name: string;
    type: 'artist';
  };
  type: 'album';
};

export type DeezerPaginatedResponse<T> = {
  data: T[];
  total?: number;
};

export type DeezerPlaylistFull = {
  id: number;
  title: string;
  description: string;
  creation_date: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_tracks: number;
  tracks: { data: DeezerTrack[] };
};

export type DeezerEditorialCharts = {
  albums: DeezerPaginatedResponse<DeezerAlbumSummary>;
  artists: DeezerPaginatedResponse<DeezerArtistSummary>;
  playlists: DeezerPaginatedResponse<DeezerPlaylist>;
  tracks: DeezerPaginatedResponse<DeezerTrack>;
};
