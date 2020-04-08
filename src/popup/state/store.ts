import { service } from '../network/service';
import { Rules, RuleItem, Server } from '../interfaces/init-response';
import { observable, action, computed } from 'mobx';
import { setting } from '../lib/settings';
import { Tabs } from '../components/header/header';

// generic is the function of type definition

// const transformRules = async (rule: Rules) => {
//   // const needAutoSorting = await setting.getAutoSorting();
//   // setRules(rule);
//   //   return;
//   // const selected: ListItem[] = [];
//   // const unSelected: ListItem[] = [];
//   // rule.list!.forEach(item => {
//   //   if (item.selected) {
//   //     selected.push(item);
//   //   } else {
//   //     unSelected.push(item);
//   //   }
//   // });
//   // rule.list = selected.concat(unSelected);
//   // setRules(rule);
// };]

export class Store {
  @observable public rules: Rules | null = null;
  @observable public isWhistleWorking = false;
  @observable public isLoading = true;
  @observable public server: Server | null = null;
  @observable public currentTab: Tabs = 'rules';
  clientId: string = '';

  @computed
  get isAllowMultiChoice() {
    if (!this.rules) return false;
    return this.rules.allowMultipleChoice;
  }

  @action
  async getRules() {
    try {
      this.isLoading = true;
      const response = await service.init();

      this.rules = response.data.rules;
      this.clientId = response.data.clientId;
      this.server = response.data.server;

      this.isWhistleWorking = true;
    } catch (error) {
      this.isWhistleWorking = false;
    } finally {
      this.isLoading = false;
    }
  }

  @action
  async updateRules(item: RuleItem) {
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
      const response = await action({
        name: item.name,
        clientId: this.clientId,
        value: item.data,
      });
      let list = this.rules!.list.map(item => {
        item.selected = false;
        if (response.data.list.includes(item.name)) {
          item.selected = true;
        }
        return item;
      });
      const newRules = {
        ...this.rules!,
        defaultRulesIsDisabled: response.data.defaultRulesIsDisabled,
        list,
      };

      //   transformRules(newRules);
      this.rules = newRules;
      if (await setting.getAutoRefresh()) {
        chrome.tabs.reload();
      }
    } catch (error) {
      this.isWhistleWorking = false;
      console.error(error);
    }
  }

  @action
  async allowMultipleChoice(allowMultipleChoice: boolean) {
    try {
      const response = await service.allowMultipleChoice({ allowMultipleChoice, clientId: this.clientId });
      if (response.data && response.data.ec == 0 && this.rules) {
        this.rules.allowMultipleChoice = allowMultipleChoice;
      }
    } catch (error) {
      console.error(error);
    }
  }

  @action
  switchTabs(tab: Tabs) {
    this.currentTab = tab;
  }
}

export const store = new Store();
