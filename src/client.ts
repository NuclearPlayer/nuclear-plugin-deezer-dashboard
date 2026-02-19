import type { FetchFunction } from '@nuclearplayer/plugin-sdk';

import { DEEZER_API_BASE, DEFAULT_LIMIT } from './config';
import type {
  DeezerAlbumSummary,
  DeezerArtistSummary,
  DeezerEditorialCharts,
  DeezerEditorialRelease,
  DeezerTrack,
} from './types';

export class DeezerClient {
  #fetch: FetchFunction;

  constructor(fetchFn: FetchFunction) {
    this.#fetch = fetchFn;
  }

  async #get<T>(path: string): Promise<T> {
    const response = await this.#fetch(`${DEEZER_API_BASE}${path}`);
    return response.json();
  }

  async #getList<T>(path: string): Promise<T[]> {
    const json = await this.#get<{ data: T[] }>(path);
    return json.data;
  }

  async getTopTracks(limit = DEFAULT_LIMIT): Promise<DeezerTrack[]> {
    return this.#getList(`/chart/0/tracks?limit=${limit}`);
  }

  async getTopArtists(limit = DEFAULT_LIMIT): Promise<DeezerArtistSummary[]> {
    return this.#getList(`/chart/0/artists?limit=${limit}`);
  }

  async getTopAlbums(limit = DEFAULT_LIMIT): Promise<DeezerAlbumSummary[]> {
    return this.#getList(`/chart/0/albums?limit=${limit}`);
  }

  async getEditorialCharts(
    limit = DEFAULT_LIMIT,
  ): Promise<DeezerEditorialCharts> {
    return this.#get(`/editorial/0/charts?limit=${limit}`);
  }

  async getNewReleases(
    limit = DEFAULT_LIMIT,
  ): Promise<DeezerEditorialRelease[]> {
    return this.#getList(`/editorial/0/releases?limit=${limit}`);
  }
}
