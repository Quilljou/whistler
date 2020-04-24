import { UserDefaults, LocalUserDefaults } from './user-defaults';
import { ProxyMode } from './proxy-mode';
import pac from '../../assets/proxy.pac';

const IpKey = 'ip';
const ProxyPortKey = 'proxyPort';
const AutoSortingKey = 'autosorting';
const FreeIpKey = 'freeIp';
const FreePortKey = 'freePort';
const AutoRefreshKey = 'autoRefresh';
const ProxyModeKey = 'ProxyMode';
const PacScriptKey = 'PacScript';

class SettingController {
  proxyMode = {
    get() {
      return UserDefaults.get(ProxyModeKey, ProxyMode.Fixed);
    },

    set(val: ProxyMode) {
      UserDefaults.set(ProxyModeKey, val);
    },
  };

  pacScript = {
    get() {
      return LocalUserDefaults.get(PacScriptKey, pac);
    },

    set(val: string) {
      LocalUserDefaults.set(PacScriptKey, val);
    },
  };

  getAutoSorting() {
    return UserDefaults.get(AutoSortingKey, true);
  }

  setAutoSorting(val: boolean) {
    UserDefaults.set(AutoSortingKey, val);
  }

  setIp(val: string) {
    UserDefaults.set(IpKey, val);
  }

  getIp() {
    return UserDefaults.get(IpKey, '127.0.0.1');
  }

  setProxyPort(val: number) {
    UserDefaults.set(ProxyPortKey, val);
  }

  getProxyPort() {
    return UserDefaults.get(ProxyPortKey, 8899);
  }

  getFreeIp() {
    return UserDefaults.get(FreeIpKey, '127.0.0.1');
  }

  setFreeIp(val: number) {
    UserDefaults.set(FreeIpKey, val);
  }

  getFreePort() {
    return UserDefaults.get(FreePortKey, 1080);
  }

  setFreePort(val: number) {
    UserDefaults.set(FreePortKey, val);
  }

  getAutoRefresh() {
    return UserDefaults.get(AutoRefreshKey, true);
  }

  setAutoRefresh(val: boolean) {
    UserDefaults.set(AutoRefreshKey, val);
  }
}

const setting = new SettingController();

export { setting };
