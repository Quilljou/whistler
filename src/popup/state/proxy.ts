import { observable, action } from 'mobx';
import { chromeProxy } from '../lib/proxy';

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
      });
    } else {
      chromeProxy.stopProxy();
      this.refreshProxyStatus();
    }
  }

  @action
  reConnectProxy() {
    chromeProxy.stopProxy();
    chromeProxy.setProxy(() => {
      this.refreshProxyStatus();
    });
  }
}

export const proxyStore = new ProxyStore();
