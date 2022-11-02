import Button, { CustomThemeButton, LoadingButton } from '../index';

type Case = {
  name: string;
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component: typeof Button | typeof CustomThemeButton | typeof LoadingButton;
};

const cases: Case[] = [
  {
    name: 'Button',
    Component: Button
  },
  {
    name: 'CustomThemeButton',
    Component: CustomThemeButton
  },
  {
    name: 'LoadingButton',
    Component: LoadingButton
  }
];

export default function forEachType(fn: (value: Case) => void) {
  cases.forEach((value: Case) => fn(value));
}
