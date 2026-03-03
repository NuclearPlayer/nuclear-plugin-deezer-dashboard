import type { PlaylistProvider } from '@nuclearplayer/plugin-sdk';

import { DeezerClient, isPlaylistUrl } from './client';
import { PLAYLIST_PROVIDER_ID, PLAYLIST_PROVIDER_NAME } from './config';
import { mapDeezerFullPlaylistToPlaylist } from './mappers';

export const createPlaylistProvider = (
  client: DeezerClient,
): PlaylistProvider => ({
  id: PLAYLIST_PROVIDER_ID,
  kind: 'playlists',
  name: PLAYLIST_PROVIDER_NAME,
  matchesUrl: isPlaylistUrl,
  async fetchPlaylistByUrl(url: string) {
    const playlist = await client.getPlaylist(url);
    return mapDeezerFullPlaylistToPlaylist(playlist);
  },
});
