import React, { FC, MouseEventHandler } from 'react';
import { useStore } from '../state/context';

interface Props {
  onGoSetting: MouseEventHandler<HTMLElement>;
}

export const RefineTips: FC<Props> = ({ onGoSetting }: Props) => {
  const { store } = useStore();

  const onRefresh = () => {
    // console.log(store);
    store.getRules();
  };

  return (
    <div id="refineTips">
      <h2>🚑 连接 Whistle 失败</h2>
      <p>
        🤖未启动 Whistle：去启动 =&gt; <code>w2 start</code>{' '}
      </p>

      <h2>✅已启动 Whistle</h2>
      <p onClick={onGoSetting}>🔧试试重新设置端口和IP&gt;&gt;</p>
      <p onClick={onRefresh}>🔥刷新&gt;&gt;</p>
    </div>
  );
};
