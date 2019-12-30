import React, { FC } from 'react';
import { InitResponse } from '../interfaces/init-response';

interface Props {
  rules: Partial<InitResponse['rules']>;
  onClickItem: (list: InitResponse['rules']['list'][0]) => any;
}

export const RuleList: FC<Props> = ({ rules, onClickItem }: Props) => {
  const list = [{ data: '', index: -1, name: 'Default', selected: !rules.defaultRulesIsDisabled! }].concat(rules.list!);
  const goWhistle = () => {
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
        }
      },
    );
  };

  return (
    <div>
      <a href="#" onClick={goWhistle}>
        Go whistle
      </a>
      <div className="w-list-data">
        {list.map(item => (
          <a
            key={item.index}
            className={item.selected ? 'w-selected' : ''}
            onClick={() => onClickItem(item)}
            title={item.data}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};
