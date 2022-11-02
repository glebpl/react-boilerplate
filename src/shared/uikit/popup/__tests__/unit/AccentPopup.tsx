import { waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import * as React from 'react';
import AccentPopup from '../../AccentPopup';
import Button from '../../../button';
import { ExternalLinkIcon } from '../../../icon/glyph';

it('matches basic snapshot', async () => {
  const popup = mount(
    <AccentPopup
      action={{
        text: 'Got it!',
        onClick: () => {}
      }}
      content={<div>content</div>}
      isOpen={true}
      trigger={triggerProps => <Button {...triggerProps}>Just Accent</Button>}
    />
  );
  await waitFor(() => {
    expect(popup).toMatchSnapshot();
  });
});

it('matches snapshot with multiple actions and banner', async () => {
  const popup = mount(
    <AccentPopup
      actions={[
        {
          text: 'Learn more',
          appearance: 'accent-subtle',
          onClick: () => {},
          iconAfter: <ExternalLinkIcon size={'small'} />
        },
        {
          text: 'Got it!',
          onClick: () => {}
        }
      ]}
      content={<div>content</div>}
      isOpen={true}
      trigger={triggerProps => <Button {...triggerProps}>Just Accent</Button>}
      title='New Feature!'
    />
  );
  await waitFor(() => {
    expect(popup).toMatchSnapshot();
  });
});
