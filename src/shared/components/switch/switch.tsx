import React, { FC } from 'react';
import './index.styl';

interface Props {
  value: boolean;
  onChange: (value: boolean) => any;
}

let id = 0;

export const Switch: FC<Props> = ({ value, onChange }: Props) => {
  id++;
  const idLabel = `switch-${id}`;
  return (
    <div className="switch">
      <input type="checkbox" checked={value} onChange={() => onChange(!value)} id={idLabel} />
      <label htmlFor={idLabel}></label>
    </div>
  );
};
