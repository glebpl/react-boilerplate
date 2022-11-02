import { CSSObject } from '@emotion/react';

export * from './dom';

/**
 * Convert a hex colour code to RGBA.
 * @param {String} hex Hex colour code.
 * @param {Number} alpha Optional alpha value (defaults to 1).
 */
export const hex2rgba = (hex: string, alpha = 1): string => {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let colorArr = hex.substring(1).split('');

    if (colorArr.length === 3) {
      colorArr = [colorArr[0], colorArr[0], colorArr[1], colorArr[1], colorArr[2], colorArr[2]];
    }

    const color = `0x${colorArr.join('')}`;

    // FIXME: `>>` operand can validly take a string value
    /* eslint-disable no-bitwise */
    const r = ((color as any) >> 16) & 255;
    /* eslint-disable no-bitwise */
    const g = ((color as any) >> 8) & 255;
    /* eslint-disable no-bitwise */
    const b = (color as any) & 255;

    return `rgba(${[r, g, b].join(',')}, ${alpha})`;
  }

  throw new Error('Bad Hex');
};

function camelCase(str: string) {
  return str.split('-').reduce((a, b) => a + b.charAt(0).toUpperCase() + b.slice(1));
}

export function convertCSSStringToObject(cssText: string): CSSObject {
  const map = cssText.split(';').map(i => i.trim());
  if (map[map.length - 1] === '') map.pop();
  const res: Record<string, string> = {};
  map.forEach(i => {
    const [key, val] = i.split(':');
    res[camelCase(key)] = val.trim();
  });
  return res;
}
