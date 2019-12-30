import axios from 'axios';
import { setting } from '../lib/settings';
import { request } from './request';
import { InitResponse } from '../interfaces/init-response';
import { stringify } from 'query-string';
import { SelectResponse } from '../interfaces/select-response';

const formUrlEncodedHeader = {
  'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
};

interface ChangeRuleParams {
  clientId: string;
  value: string;
  name: string;
}

export class Service {
  async init() {
    return request<InitResponse>({
      url: '/cgi-bin/init',
      method: 'GET',
      data: {
        t: Date.now(),
      },
    });
  }

  async enableDefault({ clientId, value }: ChangeRuleParams) {
    return request<SelectResponse>({
      url: '/cgi-bin/rules/enable-default',
      method: 'POST',
      headers: formUrlEncodedHeader,
      data: stringify({
        isDefault: true,
        selected: false,
        clientId,
        value,
      }),
    });
  }

  disableDefault({ clientId }: ChangeRuleParams) {
    return request<SelectResponse>({
      url: '/cgi-bin/rules/disable-default',
      method: 'POST',
      headers: formUrlEncodedHeader,
      data: stringify({
        selected: true,
        isDefault: true,
        clientId: clientId,
      }),
    });
  }

  select({ clientId, name, value }: ChangeRuleParams) {
    return request<SelectResponse>({
      url: '/cgi-bin/rules/select',
      method: 'POST',
      headers: formUrlEncodedHeader,
      data: stringify({
        selected: false,
        clientId,
        name,
        value,
      }),
    });
  }

  unselect({ clientId, name, value }: ChangeRuleParams) {
    return request<SelectResponse>({
      url: '/cgi-bin/rules/unselect',
      method: 'POST',
      headers: formUrlEncodedHeader,
      data: stringify({
        selected: true,
        clientId,
        name,
        value,
      }),
    });
  }
}
