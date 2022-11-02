export const canUseDOM = (): boolean =>
  !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export const getNodeName = (node: Node | Window): string | undefined =>
  'nodeName' in node ? node.nodeName.toLowerCase() : undefined;

export const isWindow = (node: Node | Window): node is Window => node.toString() === '[object Window]';

export const getWindow = (node: Node | Window): Window => {
  if (isWindow(node)) return node;
  const ownerDocument = node.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView || window : window;
};

export const getDocumentElement = (node: Node): HTMLElement =>
  (node.ownerDocument || getWindow(node).document).documentElement;

export const getParentNode = (node: Node): Node => {
  if (getNodeName(node) === 'html') {
    return node;
  }
  return node.parentNode || getDocumentElement(node);
};

export const isScrollParent = (element: HTMLElement): boolean => {
  // Firefox wants us to check `-x` and `-y` variations as well
  const { overflow, overflowX, overflowY } = window.getComputedStyle(element);
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
};

export const getScrollParent = (node: Node): HTMLElement => {
  const nodeName = getNodeName(node);
  if (nodeName && ['html', 'body', '#document'].indexOf(nodeName) >= 0) {
    return getWindow(node).document.body;
  }
  if (node instanceof HTMLElement && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
};

export const getElementTranslate = (el: HTMLElement): { x: number; y: number } => {
  let x = 0;
  let y = 0;
  let ta;
  const { transform } = window.getComputedStyle(el);
  if (transform.startsWith('matrix3d(')) {
    ta = transform.slice(9, -1).split(/, /);
    x = +ta[12];
    y = +ta[13];
  } else if (transform.startsWith('matrix(')) {
    ta = transform.slice(7, -1).split(/, /);
    x = +ta[4];
    y = +ta[5];
  }
  return { x, y };
};

export const hasLayout = (e: HTMLElement): boolean => e.getClientRects().length > 0;
