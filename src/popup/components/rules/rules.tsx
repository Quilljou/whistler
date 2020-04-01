import React, { FC } from 'react';
import { RuleItem } from '../../interfaces/init-response';
import { RuleList } from '../rule-list/rule-list';
import { RefineTips } from '../refine-tips';
import { useStore } from '../../state/context';
import { observer } from 'mobx-react-lite';

const Rules: FC = () => {
  const { store } = useStore();

  const onClickRuleItem = (item: RuleItem) => {
    store.updateRules(item);
  };

  const onGoSetting = () => {
    window.open('/options.html');
  };

  if (store.isWhistleWorking && store.rules) {
    return <RuleList rules={store.rules} onClickItem={onClickRuleItem}></RuleList>;
  } else {
    return <RefineTips onGoSetting={onGoSetting}></RefineTips>;
  }
};

export default observer(Rules);
