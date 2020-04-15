import React, { FC, useState, ChangeEvent, useRef, useEffect } from 'react';
import './index.styl';

interface Props {
  value: string;
  onSave(value: string): any;
  onBlur?(): any;
}

export const TextArea: FC<Props> = (props: Props) => {
  const { value, onSave, onBlur } = props;
  const [editText, setEditText] = useState('');

  useEffect(() => {
    setEditText(value);
  }, [value]);

  const handleBlur = () => {
    if (editText.length && editText !== value) {
      onSave(editText);
    } else {
      setEditText(value);
    }
    onBlur && onBlur();
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value);
  };

  return <textarea className={'textarea'} value={editText} onBlur={handleBlur} onChange={handleChange}></textarea>;
};
