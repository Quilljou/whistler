import React, { useState, useEffect, useRef } from 'react';
import { RefineTips } from './components/refine-tips';
import { RuleList } from './components/rule-list';
import { Setting } from './components/setting';
import { InitResponse } from './interfaces/init-response';
import { Service } from './network/service';

const service = new Service();

type ListItem = InitResponse['rules']['list'][0];

function App() {
  const [isWhistleWorking, setIsWhistleWorking] = useState(true);
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [rules, setRules] = useState<Partial<InitResponse['rules']>>({ list: [] });
  let clientIdRef = useRef('');

  async function init() {
    try {
      const response = await service.init();
      const data = response.data;
      clientIdRef.current = data.clientId;
      setIsWhistleWorking(true);
      setRules(data.rules);
    } catch (error) {
      console.error(error);
      setIsWhistleWorking(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  // chrome.storage.sync.set({ port: 323 }, function() {
  //   chrome.storage.sync.get('port', function(items) {
  //     console.log(items);
  //   });
  // });

  const onClickRuleItem = async (item: ListItem) => {
    let action: typeof service.select;
    if (item.name === 'Default') {
      if (item.selected) {
        action = service.disableDefault;
      } else {
        action = service.enableDefault;
      }
    } else {
      if (item.selected) {
        action = service.unselect;
      } else {
        action = service.select;
      }
    }
    // Start Request
    try {
      const response = await action({ name: item.name, clientId: clientIdRef.current, value: item.data });
      const newRules = {
        ...rules,
        defaultRulesIsDisabled: response.data.defaultRulesIsDisabled,
        list: rules.list!.map(item => {
          item.selected = false;
          if (response.data.list.includes(item.name)) {
            item.selected = true;
          }
          return item;
        }),
      };
      setRules(newRules);
    } catch (error) {
      console.error(error);
    }
  };

  const onSave = () => {
    init();
    setIsShowSetting(false);
  };

  const onGoSetting = () => setIsShowSetting(true);

  if (isWhistleWorking) {
    return <RuleList rules={rules} onClickItem={onClickRuleItem}></RuleList>;
  }
  if (isShowSetting) {
    return <Setting onSave={onSave}></Setting>;
  } else {
    return <RefineTips onGoSetting={onGoSetting}></RefineTips>;
  }
}

export default App;
