import type {
  AlbumRef,
  ArtistRef,
  PlaylistRef,
  Track,
} from '@nuclearplayer/plugin-sdk';

import type {
  DeezerAlbumSummary,
  DeezerArtistSummary,
  DeezerEditorialRelease,
  DeezerPlaylist,
  DeezerTrack,
} from './types';

const PROVIDER = 'deezer';

const deezerSource = (id: number) => ({
  provider: PROVIDER,
  id: String(id),
});

const artistArtwork = (artist: {
  picture_big: string;
  picture_medium: string;
}) => ({
  items: [
    { url: artist.picture_big, purpose: 'cover' as const },
    { url: artist.picture_medium, purpose: 'thumbnail' as const },
  ],
});

const albumArtwork = (cover: { cover_big: string; cover_medium: string }) => ({
  items: [
    { url: cover.cover_big, purpose: 'cover' as const },
    { url: cover.cover_medium, purpose: 'thumbnail' as const },
  ],
});

export const mapDeezerTrack = (track: DeezerTrack): Track => ({
  title: track.title,
  artists: [
    {
      name: track.artist.name,
      roles: ['main'],
      source: deezerSource(track.artist.id),
    },
  ],
  album: {
    title: track.album.title,
    artwork: albumArtwork(track.album),
    source: deezerSource(track.album.id),
  },
  durationMs: track.duration * 1000,
  trackNumber: track.position,
  artwork: albumArtwork(track.album),
  source: deezerSource(track.id),
});

export const mapDeezerArtist = (artist: DeezerArtistSummary): ArtistRef => ({
  name: artist.name,
  artwork: artistArtwork(artist),
  source: deezerSource(artist.id),
});

export const mapDeezerAlbum = (album: DeezerAlbumSummary): AlbumRef => ({
  title: album.title,
  artists: [
    {
      name: album.artist.name,
      artwork: artistArtwork(album.artist),
      source: deezerSource(album.artist.id),
    },
  ],
  artwork: albumArtwork(album),
  source: deezerSource(album.id),
});

export const mapDeezerPlaylist = (playlist: DeezerPlaylist): PlaylistRef => ({
  id: String(playlist.id),
  name: playlist.title,
  artwork: {
    items: [
      { url: playlist.picture_big, purpose: 'cover' as const },
      { url: playlist.picture_medium, purpose: 'thumbnail' as const },
    ],
  },
  source: {
    ...deezerSource(playlist.id),
    url: playlist.link,
  },
});

export const mapDeezerRelease = (
  release: DeezerEditorialRelease,
): AlbumRef => ({
  title: release.title,
  artists: [
    {
      name: release.artist.name,
      source: deezerSource(release.artist.id),
    },
  ],
  artwork: albumArtwork(release),
  source: deezerSource(release.id),
});
