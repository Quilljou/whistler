import pac from '../../assets/proxy.pac';
import { setting } from './settings';
import { ProxyMode } from './proxy-mode';

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

  getProxyStatus() {
    return new Promise<string>(function(resolve) {
      chrome.proxy.settings.get({ incognito: false }, details => {
        resolve(details.levelOfControl);
      });
    });
  }

  async setProxy(cb?: Function) {
    const proxyMode = await setting.proxyMode.get();
    const whistleIP = await setting.getIp();
    const ChromeProxyPort = await setting.getProxyPort();

    let config: chrome.proxy.ProxyConfig;

    if (proxyMode === ProxyMode.BuiltInPac) {
      config = {
        mode: 'pac_script',
        pacScript: {
          data: await ChromeProxy.transfromPac(pac),
        },
      };
    } else if (proxyMode === ProxyMode.Fixed) {
      config = {
        mode: 'fixed_servers',
        rules: {
          singleProxy: {
            host: whistleIP,
            port: ChromeProxyPort,
          },
        },
      };
    } else if (proxyMode === ProxyMode.CustomPac) {
      const pacScirpt = await setting.pacScript.get();
      config = {
        mode: 'pac_script',
        pacScript: {
          data: pacScirpt,
        },
      };
    }

    chrome.proxy.settings.set(
      {
        value: config!,
      },
      cb,
    );
  }

  stopProxy() {
    chrome.proxy.settings.clear({});
  }
}

export const chromeProxy = new ChromeProxy();
