import React, { useState, useEffect, ChangeEvent } from 'react';
import { setting } from '../../lib/settings';
import { Switch } from '../../../shared/components/switch/switch';
import i18n from '../../../shared/locale';
import './index.styl';
import { TextInput } from '../text-input/text-input';
import { useStore } from '../../state/context';
import { observer } from 'mobx-react-lite';
import { Clipboard } from '../clipboard/clipboard';

export default observer(() => {
  const { store, proxyStore } = useStore();
  const { isAllowMultiChoice } = store;
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [ip, setIp] = useState('');
  const [uiPort, setUIPort] = useState(0);
  const [proxyPort, setProxyPort] = useState(0);
  const [freePort, setFreePort] = useState(0);

  const resotoreFromStorage = async () => {
    setAutoRefresh(await setting.getAutoRefresh());

    setIp(await setting.getIp());
    setUIPort(await setting.getUIPort());
    setProxyPort(await setting.getProxyPort());
    setFreePort(await setting.getFreePort());
  };

  useEffect(() => {
    resotoreFromStorage();
  }, []);

  const autoFreshValueChanged = (value: boolean) => {
    setting.setAutoRefresh(value);
    setAutoRefresh(value);
  };

  const useMultipleValueChanged = (value: boolean) => {
    store.allowMultipleChoice(value);
  };

  const ipChanged = (value: string) => {
    setting.setIp(value);
    setIp(value);
    store.switchTabs('rules');
    store.getRules();
  };

  const uiPortChanged = (value: string) => {
    setting.setUIPort(+value);
    setUIPort(+value);
  };

  const proxyPortChanged = (value: string) => {
    setting.setProxyPort(+value);
    setProxyPort(+value);
    store.switchTabs('rules');
    store.getRules();
  };

  const freePortChanged = (value: string) => {
    setting.setFreePort(+value);
    setFreePort(+value);
    proxyStore.reConnectProxy();
  };
  return (
    <div className="settings">
      <div className="settings-section">
        <div className="settings-section-title">{i18n('settingSectionGeneral')}</div>

        <div className="form-control">
          <div className="form-label">{i18n('settingAutoRefresh')}</div>
          <div className="form-input">
            <Switch value={autoRefresh} onChange={autoFreshValueChanged} />
          </div>
        </div>

        <div className="form-control">
          <div className="form-label">{i18n('settingUseMultiple')}</div>
          <div className="form-input">
            <Switch value={isAllowMultiChoice} onChange={useMultipleValueChanged} />
          </div>
        </div>

        {/* <div className="form-control">
          <div className="form-label">{i18n('settingDarkMode')}</div>
          <div className="form-input"><Switch value={autoSetting} onChange={autoSettingValueChanged} /></div>
        </div> */}

        <div className="form-control">
          <div className="form-label">{i18n('settingIpv4')}</div>
          <div className="form-input">
            <Clipboard text={store.server ? store.server.ipv4.join('') : '--'}></Clipboard>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">{i18n('settingSectionProxy')}</div>

        <div className="form-control">
          <div className="form-label">{i18n('whistleHost')}</div>
          <div className="form-input">
            <TextInput type="text" value={ip} onSave={ipChanged} />
          </div>
        </div>

        <div className="form-control">
          <div className="form-label">{i18n('WhistlePort')}</div>
          <div className="form-input">
            <TextInput value={String(proxyPort)} onSave={proxyPortChanged} />
          </div>
        </div>

        <div className="form-control">
          <div className="form-label">{i18n('WhistleGuiPort')}</div>
          <div className="form-input">
            <TextInput value={String(uiPort)} onSave={uiPortChanged} />
          </div>
        </div>

        <div className="form-control">
          <div className="form-label">{i18n('FreePort')}</div>
          <div className="form-input">
            <TextInput value={String(freePort)} onSave={freePortChanged} />
          </div>
        </div>
      </div>
    </div>
  );
});
