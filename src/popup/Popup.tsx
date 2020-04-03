import React, { useEffect } from 'react';
import { Header, Tabs } from './components/header/header';
import { Bottom } from './components/bottom/bottom';
import Rules from './components/rules/rules';
import Settings from './components/settings/setting';
import { useStore } from './state/context';
import { observer } from 'mobx-react-lite';

export default observer(function Popup() {
  const { store } = useStore();
  const { currentTab } = store;

  useEffect(() => {
    store.getRules();
  }, []);

  const onChangeTab = (tab: Tabs) => {
    store.switchTabs(tab);
  };

  return (
    <div>
      <Header current={currentTab} onChange={onChangeTab}></Header>
      <div className="container">{currentTab === 'rules' ? <Rules /> : <Settings />}</div>
      <Bottom></Bottom>
    </div>
  );
});
