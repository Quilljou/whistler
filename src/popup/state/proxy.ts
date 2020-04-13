import { observable, action } from 'mobx';
import { chromeProxy } from '../lib/proxy';
import { setting } from '../lib/settings';

async function reloadTab() {
  if (await setting.getAutoRefresh()) {
    chrome.tabs.reload();
  }
}

class ProxyStore {
  @observable public proxyStatus: boolean = false;

  @action
  refreshProxyStatus() {
    chromeProxy.getProxyStatus().then(status => {
      if (status === 'controlled_by_this_extension') {
        this.proxyStatus = true;
        chrome.browserAction.setIcon({
          path: 'logo.png',
        });
      } else {
        chrome.browserAction.setIcon({
          path: 'logo-off.png',
        });
        this.proxyStatus = false;
      }
    });
  }

  @action
  toggleProxy() {
    if (!this.proxyStatus) {
      chromeProxy.setProxy(() => {
        this.refreshProxyStatus();
        reloadTab();
      });
    } else {
      chromeProxy.stopProxy();
      this.refreshProxyStatus();
      reloadTab();
    }
  }

  @action
  reConnectProxy() {
    // reconnect when proxy on
    if (this.proxyStatus) {
      chromeProxy.stopProxy();
      chromeProxy.setProxy(() => {
        this.refreshProxyStatus();
        reloadTab();
      });
    }
  }
}

export const proxyStore = new ProxyStore();
