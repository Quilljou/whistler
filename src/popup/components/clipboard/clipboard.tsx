import React, { FC, useCallback, useEffect } from 'react';
import { Clipboard as Icon } from 'react-feather';
import i18n from '../../../shared/locale';
import './index.styl';
import ClipboardJS from 'clipboard';

interface Props {
  text: string;
}

export const Clipboard: FC<Props> = ({ text }: Props) => {
  useEffect(() => {
    text && new ClipboardJS('.clipboard');
  }, [text]);

  return (
    <span title={i18n('titleClipboard')} className="clipboard" data-clipboard-text={text}>
      {text} <Icon />
    </span>
  );
};
