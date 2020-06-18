import React, { useState, useEffect, ChangeEvent } from 'react';
import { setting } from '../../lib/settings';
import { Switch } from '../../../shared/components/switch/switch';
import i18n from '../../../shared/locale';
import './index.styl';
import { TextInput } from '../text-input/text-input';
import { useStore } from '../../state/context';
import { observer } from 'mobx-react-lite';
import { Clipboard } from '../clipboard/clipboard';
import { ProxyMode } from '../../lib/proxy-mode';
import { TextArea } from '../textarea/text-area';
import { HelpCircle } from 'react-feather';

export default observer(() => {
  const { store, proxyStore } = useStore();
  const { isAllowMultiChoice } = store;
  const [autoSorting, setAutoSorting] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [ip, setIp] = useState('');
  const [proxyMode, setProxyMode] = useState(ProxyMode.Fixed);
  const [proxyPort, setProxyPort] = useState(0);
  const [freePort, setFreePort] = useState(0);
  const [pacScript, setPacScript] = useState('');

  const resotoreFromStorage = async () => {
    setAutoRefresh(await setting.getAutoRefresh());
    setAutoSorting(await setting.getAutoSorting());

    setIp(await setting.getIp());
    setProxyPort(await setting.getProxyPort());
    setFreePort(await setting.getFreePort());
    setPacScript(await setting.pacScript.get());

    // incase flash too fast
    setTimeout(async () => {
      setProxyMode(await setting.proxyMode.get());
    }, 200);
  };

  useEffect(() => {
    resotoreFromStorage();
  }, []);

  const autoFreshValueChanged = (value: boolean) => {
    setting.setAutoRefresh(value);
    setAutoRefresh(value);
  };

  const autoSortingValueChanged = (value: boolean) => {
    setting.setAutoSorting(value);
    setAutoSorting(value);
  };

  const useMultipleValueChanged = (value: boolean) => {
    store.allowMultipleChoice(value);
  };

  const ipChanged = (value: string) => {
    setting.setIp(value);
    setIp(value);
    store.switchTabs('rules');
    store.getRules();
    proxyStore.reConnectProxy();
  };

  const proxyModeChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as ProxyMode;
    setting.proxyMode.set(value);
    setProxyMode(value);
    proxyStore.reConnectProxy();
  };

  const proxyPortChanged = (value: string) => {
    setting.setProxyPort(+value);
    setProxyPort(+value);
    store.switchTabs('rules');
    store.getRules();
    proxyStore.reConnectProxy();
  };

  const freePortChanged = (value: string) => {
    setting.setFreePort(+value);
    setFreePort(+value);
    proxyStore.reConnectProxy();
  };

  const pacScriptChanged = (value: string) => {
    setting.pacScript.set(value);
    setPacScript(value);
    proxyStore.reConnectProxy();
  };

  const openPacHelp = () => {
    window.open(
      'https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_(PAC)_file',
    );
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
          <div className="form-label">{i18n('settingAutoSorting')}</div>
          <div className="form-input">
            <Switch value={autoSorting} onChange={autoSortingValueChanged} />
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
            {store.server ? store.server.ipv4.map(s => <Clipboard text={s} key={s}></Clipboard>) : '--'}
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
          <div className="form-label">{i18n('proxyMode')}</div>
          <div className="form-input">
            <select value={proxyMode} onChange={proxyModeChanged}>
              {Object.values(ProxyMode).map(item => (
                <option value={item} key={item} title={i18n((item + 'Title') as any)}>
                  {i18n(item)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {proxyMode == ProxyMode.BuiltInPac && (
          <div className="form-control">
            <div className="form-label">
              {i18n('FreePort')}
              <span title={i18n('FreePortTitle')}>
                <HelpCircle></HelpCircle>
              </span>
            </div>
            <div className="form-input">
              <TextInput value={String(freePort)} onSave={freePortChanged} />
            </div>
          </div>
        )}

        {proxyMode == ProxyMode.CustomPac && (
          <div className="form-control form-control-block">
            <div className="form-label">
              {i18n('CustomPac')}
              <HelpCircle onClick={openPacHelp}></HelpCircle>
            </div>
            {proxyStore.proxyErrorMessage && <div className="proxy-error">{proxyStore.proxyErrorMessage}</div>}
            <div className="form-textarea">
              <TextArea
                value={pacScript}
                onSave={pacScriptChanged}
                onBlur={() => (proxyStore.proxyErrorMessage = '')}
              ></TextArea>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
