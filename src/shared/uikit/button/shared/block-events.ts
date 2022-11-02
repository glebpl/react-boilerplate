import { SyntheticEvent, DOMAttributes, KeyboardEvent } from 'react';

function abort(event: SyntheticEvent): void {
  event.preventDefault();
  event.stopPropagation();
}

const tabKeyCode = 9;

function onKey(event: KeyboardEvent): void {
  // Allowing tab so that a user can move focus away
  if (event.keyCode === tabKeyCode) {
    return;
  }
  abort(event);
}

const block: DOMAttributes<HTMLElement> = {
  onMouseDownCapture: abort,
  onMouseUpCapture: abort,
  // because we have tabIndex = -1 when disabled,
  // keyboard events can only occur when there is an overlay
  onKeyDownCapture: onKey,
  onKeyUpCapture: onKey,
  onTouchStartCapture: abort,
  onTouchEndCapture: abort,
  onPointerDownCapture: abort,
  onPointerUpCapture: abort,
  onClickCapture: abort,
  // Just smashing the existing onClick for good measure
  onClick: abort
};

const doNotBlock: DOMAttributes<HTMLElement> = {};

export default function blockEvents({ isInteractive }: { isInteractive: boolean }): DOMAttributes<HTMLElement> {
  return isInteractive ? doNotBlock : block;
}
