import * as React from 'react';
import { AddIcon, CheckboxIcon, CrossIcon, FlagFilledIcon, ExternalLinkIcon, WarningIcon } from '../../icon/glyph';
import { ExampleDropdown } from './ExampleDropdown';

const WithIcons: React.FC = () => (
  <ExampleDropdown
    triggerButtonProps={{
      iconBefore: <AddIcon />
    }}
    items={[
      {
        text: 'Link with href',
        href: 'https://alm.works',
        target: '_blank',
        elemBefore: <AddIcon />
      },
      {
        text: 'Disabled link with href',
        href: 'https://alm.works',
        target: '_blank',
        isDisabled: true,
        elemBefore: <FlagFilledIcon />
      },
      {
        isDisabled: true,
        text: 'Disabled item',
        elemBefore: <CrossIcon />
      },
      {
        text: "Don't do this!",
        elemBefore: <WarningIcon />
      },
      {
        text: 'With icon after text',
        elemAfter: <WarningIcon />
      },
      {
        text: 'With two icons',
        elemBefore: <CheckboxIcon />,
        elemAfter: <ExternalLinkIcon />
      }
    ]}
  />
);

export default WithIcons;
