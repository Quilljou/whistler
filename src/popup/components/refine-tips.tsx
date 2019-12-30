import React, { FC, MouseEventHandler } from 'react';

interface Props {
  onGoSetting: MouseEventHandler<HTMLAnchorElement>;
}

export const RefineTips: FC<Props> = ({ onGoSetting }: Props) => {
  return (
    <div id="refineTips">
      <h2>🚑 连接 Whistle 失败</h2>
      <p>
        🤖未启动 Whistle：去启动 =&gt; <code>w2 start</code>{' '}
      </p>
      <p>
        🔧已启动 Whistle：
        <a href="#" onClick={onGoSetting}>
          试试重新设置端口和IP&gt;&gt;
        </a>
      </p>
    </div>
  );
};
