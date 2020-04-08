import React, { FC } from 'react';
import { RuleItem } from '../../interfaces/init-response';
import { RuleList } from '../rule-list/rule-list';
import { RefineTips } from '../refine-tips/refine-tips';
import { useStore } from '../../state/context';
import { observer } from 'mobx-react-lite';
import { Loader } from '../loader/loader';

const Rules: FC = () => {
  const { store } = useStore();

  const onClickRuleItem = (item: RuleItem) => {
    store.updateRules(item);
  };

  if (store.isLoading) {
    return (
      <div className="rule-list-panel">
        <Loader></Loader>
      </div>
    );
  } else if (store.isWhistleWorking && store.rules) {
    return <RuleList rules={store.rules} onClickItem={onClickRuleItem}></RuleList>;
  } else {
    return <RefineTips></RefineTips>;
  }
};

export default observer(Rules);
