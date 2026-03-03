import type { NuclearPlugin, NuclearPluginAPI } from '@nuclearplayer/plugin-sdk';

import { DeezerClient } from './client';
import { DASHBOARD_PROVIDER_ID, PLAYLIST_PROVIDER_ID } from './config';
import { createDashboardProvider } from './dashboard-provider';
import { createPlaylistProvider } from './playlist-provider';

let client: DeezerClient | null = null;

const plugin: NuclearPlugin = {
  onEnable(api: NuclearPluginAPI) {
    client = new DeezerClient(api.Http.fetch);
    api.Providers.register(createDashboardProvider(client));
    api.Providers.register(createPlaylistProvider(client));
  },

  onDisable(api: NuclearPluginAPI) {
    api.Providers.unregister(DASHBOARD_PROVIDER_ID);
    api.Providers.unregister(PLAYLIST_PROVIDER_ID);
    client = null;
  },
};

export default plugin;
