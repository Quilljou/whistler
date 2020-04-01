import React, { FC, useState, useEffect } from 'react';
import { setting } from '../../lib/settings';
import './index.styl';
import { Switch } from '../../../shared/components/switch/switch';
import i18n from '../../../shared/locale';
import { chromeProxy } from '../../lib/proxy';
import { useStore } from '../../state/context';
import { observer } from 'mobx-react-lite';

const goWhistle = async () => {
  const url = `http://${await setting.getIp()}:${await setting.getUIPort()}`;
  chrome.tabs.query(
    {
      title: 'Whistle Web Debugger',
    },
    function(tabs) {
      let tab;
      if ((tab = tabs[0]) && tab.id) {
        chrome.tabs.update(tab.id, {
          active: true,
        });
      } else {
        chrome.tabs.create({
          url,
          active: true,
        });
      }
    },
  );
};

export const Bottom = observer(() => {
  const { proxyStore } = useStore();
  const { proxyStatus } = proxyStore;
  useEffect(() => {
    proxyStore.refreshProxyStatus();
  }, []);

  return (
    <div className="bottom">
      <div className="logo" onClick={goWhistle} title={i18n('openWhistleTitle')}></div>
      <div className="proxy-status" title={i18n(proxyStatus ? 'proxyStatusTitleOff' : 'proxyStatusTitleOn')}>
        <Switch value={proxyStatus} onChange={() => proxyStore.toggleProxy()}></Switch>
        <span className="proxy-status-text">{i18n(proxyStatus ? 'proxyStatusOn' : 'proxyStatusOff')}</span>
      </div>
    </div>
  );
});
