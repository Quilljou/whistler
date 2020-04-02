import React, { FC } from 'react';
import { Settings, Icon, Server } from 'react-feather';
import './index.styl';

export type Tabs = 'rules' | 'settings';

const tabs: { key: Tabs; name: string; icon: Icon }[] = [
  {
    key: 'rules',
    name: chrome.i18n.getMessage('rulesTabName'),
    icon: Server,
  },
  {
    key: 'settings',
    name: chrome.i18n.getMessage('settingsTabName'),
    icon: Settings,
  },
];

interface Props {
  current: Tabs;
  onChange: (tab: Tabs) => any;
}

export const Header: FC<Props> = (props: Props) => {
  const { current, onChange } = props;
  const IconSize = 16;
  return (
    <div className="header">
      <div className="header_tabs">
        {tabs.map(item => (
          <div
            className={`header_tabs-item ${item.key === current ? 'header_tabs-item__selected' : ''}`}
            key={item.key}
            onClick={() => onChange(item.key)}
          >
            <item.icon size={IconSize}></item.icon>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
