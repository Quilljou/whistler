import React, { FC, useState, useEffect } from 'react';
import { setting } from '../lib/settings';

interface Props {
  onSave: (url: string) => any;
}

export const Setting: FC<Props> = ({ onSave }: Props) => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState(0);

  const resotoreFromStorage = async () => {
    setIp(await setting.getIp());
    setPort(await setting.getPort());
  };

  useEffect(() => {
    resotoreFromStorage();
  }, []);

  const onSubmit = () => {
    // TODO: validate
    setting.setIp(ip);
    setting.setPort(port);
    onSave(ip + port);
  };

  return (
    <div>
      <a href="#">返回</a>
      <form id="setting" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="ip">IP</label>
          <input type="text" value={ip} onChange={e => setIp(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="port">端口</label>
          <input type="number" value={port} onChange={e => setPort(+e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">
          确认
        </button>
      </form>
    </div>
  );
};
