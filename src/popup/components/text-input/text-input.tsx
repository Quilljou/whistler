import React, { FC, useState, ChangeEvent, useCallback, InputHTMLAttributes, useRef, useEffect } from 'react';
import { Feather } from 'react-feather';
import './index.styl';

interface Props {
  value: string;
  onSave: (value: string) => any;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
}

export const TextInput: FC<Props> = (props: Props) => {
  const { value, onSave, type = 'text' } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isEditing]);

  useEffect(() => {
    setEditText(value);
  }, [value]);

  const handleBlur = () => {
    setIsEditing(false);
    if (editText.length && editText !== value) {
      onSave(editText);
    } else {
      setEditText(value);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == 13) {
      handleBlur();
    }
  };

  const changeEditing = () => {
    setIsEditing(true);
  };

  const renderText = () => (
    <>
      <span>{value}</span>
      <Feather onClick={changeEditing}></Feather>
    </>
  );

  const renderInput = () => (
    <input
      ref={inputRef}
      type={type}
      value={editText}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    ></input>
  );

  return <div className="text-input">{isEditing ? renderInput() : renderText()}</div>;
};
