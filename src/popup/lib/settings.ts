import { UserDefaults } from './user-defaults';

const PortKey = 'port';
const IpKey = 'ip';

class SettingController {
  setIp(val: string) {
    UserDefaults.set(IpKey, val);
  }

  getIp() {
    return UserDefaults.get(IpKey, '127.0.0.1');
  }

  setPort(val: number) {
    UserDefaults.set(PortKey, val);
  }

  getPort() {
    return UserDefaults.get(PortKey, 8899);
  }
}

const setting = new SettingController();

export { setting };
