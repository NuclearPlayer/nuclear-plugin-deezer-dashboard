import type { DashboardProvider } from '@nuclearplayer/plugin-sdk';

import { DeezerClient } from './client';
import { DASHBOARD_PROVIDER_ID, DASHBOARD_PROVIDER_NAME } from './config';
import {
  mapDeezerAlbum,
  mapDeezerArtist,
  mapDeezerPlaylist,
  mapDeezerRelease,
  mapDeezerTrack,
} from './mappers';

export const createDashboardProvider = (
  client: DeezerClient,
): DashboardProvider => ({
  id: DASHBOARD_PROVIDER_ID,
  kind: 'dashboard',
  name: DASHBOARD_PROVIDER_NAME,
  capabilities: [
    'topTracks',
    'topArtists',
    'topAlbums',
    'editorialPlaylists',
    'newReleases',
  ],

  async fetchTopTracks() {
    const tracks = await client.getTopTracks();
    return tracks.map(mapDeezerTrack);
  },

  async fetchTopArtists() {
    const artists = await client.getTopArtists();
    return artists.map(mapDeezerArtist);
  },

  async fetchTopAlbums() {
    const albums = await client.getTopAlbums();
    return albums.map(mapDeezerAlbum);
  },

  async fetchEditorialPlaylists() {
    const charts = await client.getEditorialCharts();
    return charts.playlists.data.map(mapDeezerPlaylist);
  },

  async fetchNewReleases() {
    const releases = await client.getNewReleases();
    return releases.map(mapDeezerRelease);
  },
});
