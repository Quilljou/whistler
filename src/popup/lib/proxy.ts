import pac from '../../assets/proxy.pac';
import { setting } from './settings';

export class ChromeProxy {
  static async transfromPac(pac: string) {
    const whistleIP = await setting.getIp();
    const ChromeProxyPort = await setting.getProxyPort();
    const freeIp = await setting.getFreeIp();
    const freePort = await setting.getFreePort();
    const ret = pac
      .replace('__DIRECT__', `PROXY ${whistleIP}:${ChromeProxyPort}; DIRECT`)
      .replace('__PROXY__', `PROXY ${freeIp}:${freePort}; DIRECT`);
    return ret;
  }

  constructor() {
    chrome.proxy.onProxyError.addListener(function(d) {
      console.log(d);
    });
  }

  getProxyStatus() {
    return new Promise<string>(function(resolve) {
      chrome.proxy.settings.get({ incognito: false }, details => {
        resolve(details.levelOfControl);
      });
    });
  }

  async setProxy(cb?: Function) {
    const config: chrome.proxy.ProxyConfig = {
      mode: 'pac_script',
      pacScript: {
        data: await ChromeProxy.transfromPac(pac),
      },
    };

    chrome.proxy.settings.set(
      {
        value: config,
      },
      cb,
    );
  }

  stopProxy() {
    chrome.proxy.settings.clear({});
  }
}

export const chromeProxy = new ChromeProxy();
