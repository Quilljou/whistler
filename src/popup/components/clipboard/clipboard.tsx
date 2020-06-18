import React, { FC, useCallback, useEffect, useRef } from 'react';
import { Clipboard as Icon } from 'react-feather';
import i18n from '../../../shared/locale';
import './index.styl';
import ClipboardJS from 'clipboard';

interface Props {
  text: string;
  className?: string;
}

export const Clipboard: FC<Props> = ({ text, className }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let instatnce: ClipboardJS;
    if (text && ref.current) {
      instatnce = new ClipboardJS(ref.current);
    }
    return () => instatnce && instatnce.destroy();
  }, [text]);

  return (
    <span title={i18n('titleClipboard')} ref={ref} className="clipboard" data-clipboard-text={text}>
      <span className={className || ''}>{text} </span>
      <Icon />
    </span>
  );
};
