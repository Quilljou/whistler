import { store } from './store';
import { proxyStore } from './proxy';

export const rootStore = {
  store: store,
  proxyStore: proxyStore,
};

export type RootStore = typeof rootStore;
