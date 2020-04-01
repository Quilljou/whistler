export interface InitResponse {
  clientId: string;
  clientIp: string;
  disabledPlugins: {};
  disabledPluginsRules: {};
  interceptHttpsConnects: boolean;
  lastDataId: string;
  latestVersion: string;
  localUIHost: string;
  mrulesClientId: string;
  mrulesTime: number;
  plugins: {};
  rules: {
    defaultRules: string;
    defaultRulesIsDisabled: boolean;
    allowMultipleChoice: boolean;
    ec: number;
    list: {
      data: string;
      index: number;
      name: string;
      selected: boolean;
    }[];
  };
  server: {
    baseDir: string;
    host: string;
    ipv4: string[];
    ipv6: string[];
    isWin: boolean;
    latestVersion: string;
    mac: string;
    nodeVersion: string;
    port: number;
    version: string;
  };
  uploadFiles: any[];
  values: {
    ec: number;
    list: {
      data: string;
      index: number;
      name: string;
    }[];
  };
  version: string;
}

export type Rules = InitResponse['rules'];

export type RuleItem = Rules['list'][0];

export type Server = InitResponse['server'];
