import { UserDefaults } from './user-defaults';
const IpKey = 'ip';
const ProxyPortKey = 'proxyPort';
const UIPortKey = 'uiPortKey';
const AutoSortingKey = 'autosorting';
const FreeIpKey = 'freeIp';
const FreePortKey = 'freePort';
const AutoRefreshKey = 'autoRefresh';
const ProxyGFWKey = 'ProxyGFW';
class SettingController {
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

  // setUIPort(val: number) {
  //   UserDefaults.set(UIPortKey, val);
  // }

  // getUIPort() {
  //   return UserDefaults.get(UIPortKey, 8899);
  // }

  getFreeIp() {
    return UserDefaults.get(FreeIpKey, '127.0.0.1');
  }

  setFreeIp(val: number) {
    UserDefaults.set(FreeIpKey, val);
  }

  getFreePort() {
    return UserDefaults.get(FreePortKey, 1087);
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

  getProxyGFW() {
    return UserDefaults.get(ProxyGFWKey, true);
  }

  setProxyGFW(val: boolean) {
    UserDefaults.set(ProxyGFWKey, val);
  }
}

const setting = new SettingController();

export { setting };
