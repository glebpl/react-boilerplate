/** @jsx jsx */
// noinspection ES6UnusedImports
import { CSSObject, jsx } from '@emotion/react';
import { AddIcon } from '../../icon';
import { palette, EmotionTheme } from '../../theme';
import { extract } from '../custom-theme-button/theme';
import { ButtonGroup, CustomThemeButton, Theme, ThemeProps, ThemeTokens } from '../index';

function ourTheme(currentTheme: (props: ThemeProps) => ThemeTokens, themeProps: ThemeProps): ThemeTokens {
  const { buttonStyles, ...rest } = currentTheme(themeProps);
  return {
    buttonStyles: (theme: EmotionTheme) => ({
      ...buttonStyles(theme),
      ...baseStyles,
      ...extract(customTheme, theme, themeProps)
    }),
    ...rest
  };
}

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
function Example() {
  return (
    <div css={{ margin: 20 }}>
      <h3 css={{ marginBottom: 15 }}>ADG Button</h3>
      <ButtonGroup>
        <CustomThemeButton iconBefore={<AddIcon label='add' size='small' />}>Button</CustomThemeButton>
        <CustomThemeButton appearance='primary'>Button</CustomThemeButton>
        <CustomThemeButton appearance='warning'>Button</CustomThemeButton>
      </ButtonGroup>

      <h3 css={{ marginBottom: 15 }}>Themed Button</h3>
      <ButtonGroup>
        <CustomThemeButton theme={ourTheme} iconBefore={<AddIcon label='add' size='small' />}>
          Button
        </CustomThemeButton>
        <CustomThemeButton theme={ourTheme} appearance='primary'>
          Button
        </CustomThemeButton>
        <CustomThemeButton theme={ourTheme} appearance='primary' isLoading>
          Button
        </CustomThemeButton>
        <CustomThemeButton theme={ourTheme} isDisabled>
          Button
        </CustomThemeButton>
      </ButtonGroup>

      <h3 css={{ marginBottom: 15 }}>Themed using Theme.Provider</h3>
      <Theme.Provider value={ourTheme}>
        <ButtonGroup>
          <CustomThemeButton iconBefore={<AddIcon label='add' size='small' />}>Button</CustomThemeButton>
          <CustomThemeButton appearance='primary'>Button</CustomThemeButton>
          <CustomThemeButton appearance='primary' isLoading>
            Button
          </CustomThemeButton>
          <CustomThemeButton isDisabled>Button</CustomThemeButton>
        </ButtonGroup>
      </Theme.Provider>
    </div>
  );
}

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
export default function CustomTheming() {
  return <Example />;
}

const baseStyles: CSSObject = {
  border: 'none',
  padding: '0px 15px',
  borderRadius: '15px',
  fontWeight: 'bold'
};

const customTheme = {
  default: {
    background: {
      default: palette.n30,
      hover: palette.n40,
      active: palette.n70
    },
    boxShadow: {
      default: `1px 2px 0 0 ${palette.n30}56 `,
      hover: `1px 2px 0 0 ${palette.n40}81`,
      active: '0px 0px 0 0'
    },
    transform: {
      default: 'initial',
      active: 'translateY(2px) translateX(1px)'
    },
    transition: {
      default: 'background 0.1s ease-out, box-shadow 0.1s cubic-bezier(0.47, 0.03, 0.49, 1.38) transform:0.1s',
      active: 'background 0s ease-out, box-shadow 0s cubic-bezier(0.47, 0.03, 0.49, 1.38) transform:0s'
    }
  },
  primary: {
    background: {
      default: '#00AECC',
      hover: '#0098B7',
      active: '#0082A0'
    },
    boxShadow: {
      default: `1px 2px 0 0 #0098B7`,
      hover: `1px 2px 0 0 #0082A0`,
      active: '0px 0px 0 0'
    },
    transform: {
      default: 'initial',
      active: 'translateY(2px) translateX(1px)'
    },
    transition: {
      default: 'background 0.1s ease-out, box-shadow 0.1s cubic-bezier(0.47, 0.03, 0.49, 1.38) transform:0.1s',
      active: 'background 0s ease-out, box-shadow 0s cubic-bezier(0.47, 0.03, 0.49, 1.38) transform:0s'
    }
  }
};
