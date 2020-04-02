import React, { FC } from 'react';
import { useStore } from '../../state/context';
import i18n from '../../../shared/locale';
import { Clipboard } from '../clipboard/clipboard';
import './index.styl';

export const RefineTips: FC = () => {
  const { store } = useStore();

  const onRefresh = () => {
    store.getRules();
  };

  // TODO: highlight params
  const onGoSetting = () => {
    store.switchTabs('settings');
  };

  return (
    <div className="refine-tips">
      <h2>{i18n('connectFailed')}</h2>
      <h3>{i18n('whistleStoped')}</h3>
      <p>
        ⚡️ {i18n('goStart')} <Clipboard text="w2 start" className="code"></Clipboard>{' '}
      </p>

      <h3>{i18n('whistleStarted')}</h3>
      <div>
        <p onClick={onGoSetting} className="link">
          🔧 {i18n('trySetting')}
        </p>
      </div>
      <div>
        <p onClick={onRefresh} className="link">
          🔥 {i18n('tryRefresh')}
        </p>
      </div>
    </div>
  );
};
