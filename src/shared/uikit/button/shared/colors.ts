import { EmotionThemeFn } from '../../theme';
import { palette } from '../../theme';
import { Appearance } from '../types';

export type ColorRule = EmotionThemeFn;

export type ColorGroup = {
  default: ColorRule;
  hover?: ColorRule;
  active?: ColorRule;
  disabled?: ColorRule;
  selected?: ColorRule;
  focus?: ColorRule;
  focusSelected?: ColorRule;
};

export type ColorPreset = {
  [key in Appearance]: ColorGroup;
};

export type BoxShadowColorGroup = {
  focus: ColorRule;
  focusSelected: ColorRule;
};

type BoxShadowColorPreset = {
  [key in Appearance]: BoxShadowColorGroup;
};

type Values = {
  background: ColorPreset;
  boxShadowColor: BoxShadowColorPreset;
  color: ColorPreset;
};

// Hard coding the active rgba color value rather than using a helper to convert it
// With helper it would be: hex2rgba(colors.B75, 0.6)
const fadedB75: ColorRule = props => 'rgba(179, 212, 255, 0.6)';

const values: Values = {
  // Default appearance
  background: {
    default: {
      default: palette.na20,
      hover: palette.na30,
      active: fadedB75,
      disabled: palette.na20,
      selected: palette.n700,
      focusSelected: palette.n700
    },
    primary: {
      default: palette.p400,
      hover: palette.p300,
      active: palette.p500,
      disabled: palette.na20,
      selected: palette.n700,
      focusSelected: palette.n700
    },
    warning: {
      default: palette.w300,
      hover: palette.w200,
      active: palette.w400,
      disabled: palette.na20,
      selected: palette.w400,
      focusSelected: palette.w400
    },
    danger: {
      default: palette.d400,
      hover: palette.d300,
      active: palette.d500,
      disabled: palette.na20,
      selected: palette.d500,
      focusSelected: palette.d500
    },
    link: {
      default: palette.none,
      selected: palette.transparent,
      focusSelected: palette.transparent
    },
    subtle: {
      default: palette.none,
      hover: palette.na30,
      active: fadedB75,
      disabled: palette.none,
      selected: palette.n700,
      focusSelected: palette.n700
    },
    accent: {
      default: palette.a400,
      hover: palette.a200,
      active: palette.a500,
      disabled: palette.na20,
      selected: palette.a400,
      focusSelected: palette.a400
    },
    'accent-subtle': {
      default: palette.none,
      hover: palette.a200,
      active: palette.a500,
      disabled: palette.na20,
      selected: palette.a400,
      focusSelected: palette.a400
    }
  },

  boxShadowColor: {
    default: {
      focus: palette.p100,
      focusSelected: palette.p100
    },
    primary: {
      focus: palette.p100,
      focusSelected: palette.p100
    },
    warning: {
      focus: palette.w500,
      focusSelected: palette.w500
    },
    danger: {
      focus: palette.d100,
      focusSelected: palette.d100
    },
    link: {
      focus: palette.p100,
      focusSelected: palette.p100
    },
    subtle: {
      focus: palette.p100,
      focusSelected: palette.p100
    },
    accent: {
      focus: palette.a100,
      focusSelected: palette.a100
    },
    'accent-subtle': {
      focus: palette.a100,
      focusSelected: palette.a100
    }
  },

  color: {
    default: {
      default: palette.n500,
      active: palette.p400,
      disabled: palette.n70,
      selected: palette.n20,
      focusSelected: palette.n20
    },
    primary: {
      default: palette.n0,
      disabled: palette.n70,
      selected: palette.n20,
      focusSelected: palette.n20
    },
    warning: {
      default: palette.n800,
      disabled: palette.n70,
      selected: palette.n800,
      focusSelected: palette.n800
    },
    danger: {
      default: palette.n0,
      disabled: palette.n70,
      selected: palette.n0,
      focusSelected: palette.n0
    },
    link: {
      default: palette.p400,
      hover: palette.p300,
      active: palette.p500,
      disabled: palette.n70,
      selected: palette.p500,
      focusSelected: palette.p400
    },
    subtle: {
      default: palette.n500,
      active: palette.p400,
      disabled: palette.n70,
      selected: palette.n20,
      focusSelected: palette.n20
    },
    accent: {
      default: palette.n0,
      disabled: palette.n70,
      selected: palette.n0,
      focusSelected: palette.n0
    },
    'accent-subtle': {
      default: palette.n0,
      disabled: palette.n70,
      selected: palette.n0,
      focusSelected: palette.n0
    }
  }
};

export default values;
