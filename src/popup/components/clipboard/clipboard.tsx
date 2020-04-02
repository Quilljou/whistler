import React, { FC, useCallback, useEffect } from 'react';
import { Clipboard as Icon } from 'react-feather';
import i18n from '../../../shared/locale';
import './index.styl';
import ClipboardJS from 'clipboard';

interface Props {
  text: string;
  className?: string;
}

export const Clipboard: FC<Props> = ({ text, className }: Props) => {
  useEffect(() => {
    let instatnce: ClipboardJS;
    if (text) {
      instatnce = new ClipboardJS('.clipboard');
    }
    return () => instatnce && instatnce.destroy();
  }, [text]);

  return (
    <span title={i18n('titleClipboard')} className="clipboard" data-clipboard-text={text}>
      <span className={className || ''}>{text} </span>
      <Icon />
    </span>
  );
};
