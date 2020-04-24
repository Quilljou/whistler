import { Rules } from '../interfaces/init-response';
import { setting } from '../lib/settings';

const KEY = 'SortRank';

export const getSortKeyRank = () => {
  return JSON.parse(localStorage.getItem(KEY) || '[]') as string[];
};

export const addSortKeyRank = (key: string) => {
  const keys = getSortKeyRank();
  const index = keys.indexOf(key);
  if (index > -1) {
    keys.splice(index, 1);
  }
  keys.unshift(key);
  localStorage.setItem(KEY, JSON.stringify(keys));
};

export const transformRules = async (rules: Rules) => {
  if (!(await setting.getAutoSorting())) {
    return rules;
  }
  const keyRank = getSortKeyRank();

  if (!keyRank.length) return rules;

  const newRuleList: Rules['list'] = [];

  keyRank.forEach((item, index) => {
    let founded;
    if ((founded = rules.list.find(rule => rule.name === item))) {
      newRuleList.push(founded);
    } else {
      keyRank.splice(index, 1);
    }
  });

  localStorage.setItem(KEY, JSON.stringify(keyRank));

  rules.list.forEach(rule => {
    if (!newRuleList.find(r => r.name === rule.name)) {
      newRuleList.push(rule);
    }
  });

  rules.list = newRuleList;
  return rules;
};
