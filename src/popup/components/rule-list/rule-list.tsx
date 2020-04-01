import React, { FC, useEffect } from 'react';
import { InitResponse } from '../../interfaces/init-response';
import { Switch } from '../../../shared/components/switch/switch';
import './index.styl';

interface Props {
  rules: Partial<InitResponse['rules']>;
  onClickItem: (list: InitResponse['rules']['list'][0]) => any;
}

export const RuleList: FC<Props> = ({ rules, onClickItem }: Props) => {
  if (!rules.list || !rules.list.length) {
    return null;
  }
  const list = [{ data: '', index: -1, name: 'Default', selected: !rules.defaultRulesIsDisabled! }].concat(rules.list!);

  return (
    <div className="rule-list-panel">
      <div className="rule-list">
        {list.map(item => (
          <div key={item.name} data-key={item.name} className="rule-list-item" onClick={() => onClickItem(item)}>
            <div className="rule-list-item-title">{item.name}</div>
            <Switch value={item.selected} onChange={() => {}}></Switch>
          </div>
        ))}
      </div>
    </div>
  );
};
