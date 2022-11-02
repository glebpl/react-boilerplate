import styled from '@emotion/styled';
import * as React from 'react';
import {
  AddIcon,
  AlmToCloudIcon,
  AlmWizardIcon,
  CalendarIcon,
  ChevronDownIcon,
  CrossIcon,
  InfoIcon,
  GearFillIcon,
  JqlQueryIcon,
  QuestionCircleIcon,
  TrashIcon,
  WarningIcon
} from '../../icon';
import { Spinner } from '../../spinner';
import { gridSize } from '../../theme';
import Button, { ButtonProps } from '../index';

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${-gridSize()}px;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  margin-left: ${gridSize()}px;
`;

const ButtonExample: React.FC<ButtonProps> = props => (
  <ButtonWrapper>
    <Button {...props} />
  </ButtonWrapper>
);

const CompactButtonExample: React.FC<ButtonProps> = props => <ButtonExample {...props} spacing='compact' />;

const WithIcons: React.FC = () => (
  <div>
    <Row>
      <ButtonExample appearance='primary' iconBefore={<GearFillIcon size='small' />}>
        Icon left
      </ButtonExample>
      <ButtonExample
        appearance='default'
        iconBefore={<AddIcon size='small' />}
        iconAfter={<ChevronDownIcon size='small' />}
      >
        Add
      </ButtonExample>
      <ButtonExample
        appearance='primary'
        isDisabled
        iconBefore={<AddIcon size='small' />}
        iconAfter={<ChevronDownIcon size='small' />}
      >
        Primary disabled
      </ButtonExample>
      <ButtonExample appearance='default' iconBefore={<CalendarIcon size='small' />}>
        Set date
      </ButtonExample>
      <ButtonExample appearance='default' iconBefore={<Spinner size='small' />}>
        Spinner
      </ButtonExample>
      <ButtonExample appearance='warning' iconBefore={<WarningIcon size='small' />}>
        Attention
      </ButtonExample>
      <ButtonExample appearance='danger' iconBefore={<CrossIcon size='small' />}>
        Delete
      </ButtonExample>
      <ButtonExample appearance='danger' iconBefore={<GearFillIcon size='small' />} />
      <ButtonExample appearance='primary' iconBefore={<ChevronDownIcon size='small' />} />
    </Row>
    <Row>
      <ButtonExample appearance='default' isSelected iconBefore={<AlmWizardIcon size='small' />}>
        Show generators
      </ButtonExample>
      <ButtonExample appearance='default' isSelected iconBefore={<QuestionCircleIcon size='small' />}>
        Help
      </ButtonExample>
      <ButtonExample appearance='subtle' iconBefore={<InfoIcon size='small' />}>
        Subtle
      </ButtonExample>
      <ButtonExample appearance='link' iconBefore={<TrashIcon size='small' />}>
        Link
      </ButtonExample>
      <ButtonExample appearance='link' iconBefore={<GearFillIcon size='small' />} />
      <ButtonExample appearance='link' iconAfter={<ChevronDownIcon size='small' />}>
        Link with caret
      </ButtonExample>
      <ButtonExample appearance='link' iconBefore={<ChevronDownIcon size='small' />} />
    </Row>
    <Row>
      <CompactButtonExample appearance='primary' iconBefore={<AlmToCloudIcon size='small' />}>
        Cloud
      </CompactButtonExample>
      <CompactButtonExample appearance='default' iconBefore={<Spinner size='small' />}>
        Compact spinner
      </CompactButtonExample>
      <CompactButtonExample appearance='default' isSelected iconBefore={<JqlQueryIcon size='small' />}>
        Transformation
      </CompactButtonExample>
      <CompactButtonExample appearance='link' iconBefore={<TrashIcon size='small' />}>
        Compact link
      </CompactButtonExample>
      <CompactButtonExample appearance='link' iconBefore={<GearFillIcon size='small' />} />
      <CompactButtonExample appearance='accent' iconBefore={<GearFillIcon size='small' />} />
      <CompactButtonExample appearance='accent' iconBefore={<ChevronDownIcon size='small' />} />
    </Row>
  </div>
);

export default WithIcons;
