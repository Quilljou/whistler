import { service } from '../network/service';
import { Rules, RuleItem, Server } from '../interfaces/init-response';
import { observable, action, computed } from 'mobx';
import { chromeProxy } from '../lib/proxy';

class ProxyStore {
  @observable public proxyStatus: boolean = false;

  @action
  refreshProxyStatus() {
    chromeProxy.getProxyStatus().then(status => {
      if (status === 'controlled_by_this_extension') {
        this.proxyStatus = true;
      } else {
        this.proxyStatus = false;
      }
      console.log(status == 'controlled_by_this_extension');
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
