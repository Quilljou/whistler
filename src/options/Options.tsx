import React, { useState, useEffect, ChangeEvent } from 'react';
import { Switch } from '../shared/components/switch/switch';
import { setting } from '../popup/lib/settings';
import throttle from 'lodash.throttle';

export default function App() {
  const [autoSetting, setAutoSetting] = useState(true);
  const [ip, setIp] = useState('');
  const [uiPort, setUIPort] = useState(0);
  const [proxyPort, setProxyPort] = useState(0);

  const resotoreFromStorage = async () => {
    setIp(await setting.getIp());
    setUIPort(await setting.getUIPort());
    setProxyPort(await setting.getProxyPort());
    setAutoSetting(await setting.getAutoSorting());
  };

  useEffect(() => {
    resotoreFromStorage();
  }, []);

  const autoSettingValueChanged = (value: boolean) => {
    setting.setAutoSorting(value);
    setAutoSetting(value);
  };

  const ipChanged = throttle((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setting.setIp(value);
    setIp(value);
  }, 200);

  const uiPortChanged = throttle((e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    setting.setUIPort(value);
    setUIPort(value);
  }, 200);

  const proxyPortChanged = throttle((e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    setting.setProxyPort(value);
    setProxyPort(value);
  }, 200);

  return (
    <div className="options">
      <h3>Settings</h3>
      <div className="form-control">
        <div className="form-label">开启自动排序</div>
        <div className="form-input">
          <Switch value={autoSetting} onChange={autoSettingValueChanged} />
        </div>
      </div>

      <div className="form-control">
        <div className="form-label">Host</div>
        <div className="form-input">
          <input type="text" value={ip} onChange={ipChanged} />
        </div>
      </div>

      <div className="form-control">
        <div className="form-label">代理端口</div>
        <div className="form-input">
          <input type="number" value={proxyPort} onChange={proxyPortChanged} />
        </div>
      </div>

      <div className="form-control">
        <div className="form-label">UI端口</div>
        <div className="form-input">
          <input type="number" value={uiPort} onChange={uiPortChanged} />
        </div>
      </div>
    </div>
  );
}
