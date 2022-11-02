import * as React from 'react';
import { ReactNode, ReactElement } from 'react';
import Button from '../../button';
import ModalDialog, { ModalTransition } from '../../modal-dialog';
import Tooltip from '../../tooltip';

const TooltipButton = ({ children, onClick }: { children: ReactNode; onClick: () => void }): ReactElement => (
  <div style={{ backgroundColor: 'white' }}>
    <Tooltip content='Click me'>
      <Button onClick={onClick}>{children}</Button>
    </Tooltip>
  </div>
);

type ModalState = {
  onboardingOpen: boolean;
  inlineOpen: boolean;
  flags: number[];
};

type ModalProps = {
  onOpen: () => void;
  onClose: () => void;
};

class Modal extends React.Component<ModalProps, ModalState> {
  state = {
    onboardingOpen: false,
    inlineOpen: false,
    flags: []
  };

  toggleOnboarding = (onboardingOpen: boolean): void => this.setState({ onboardingOpen });

  toggleInline = (inlineOpen: boolean): void => this.setState({ inlineOpen });

  addFlag = (): void => this.setState({ flags: [this.state.flags.length, ...this.state.flags] });

  removeFlag = (id: number): void => this.setState({ flags: this.state.flags.filter(v => v !== id) });

  render(): ReactElement {
    const { onboardingOpen, inlineOpen, flags } = this.state;
    return (
      <React.Fragment>
        <ModalDialog
          heading='Modal dialog 🔥'
          onClose={this.props.onClose}
          actions={[
            { text: 'Open another', onClick: this.props.onOpen },
            { text: 'Close', onClick: this.props.onClose }
          ]}
        >
          <p>This dialog has three great features:</p>
        </ModalDialog>
      </React.Fragment>
    );
  }
}

type State = {
  modals: number[];
};

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/ban-types
class App extends React.Component<{}, State> {
  state = {
    modals: []
  };

  render(): ReactElement {
    const { modals } = this.state;
    const nextId = modals.length + 1;
    return (
      <React.Fragment>
        <ModalTransition>
          {modals.map(id => (
            <Modal
              key={id}
              onOpen={(): void => this.setState({ modals: [...modals, nextId] })}
              onClose={(): void => this.setState({ modals: modals.filter(i => i !== id) })}
            />
          ))}
        </ModalTransition>
        <p>
          This example shows off all components that rely on portalling and layering to appear in the expected order.
        </p>
        <TooltipButton
          onClick={(): void =>
            this.setState({
              modals: [1]
            })
          }
        >
          Open Dialog
        </TooltipButton>
      </React.Fragment>
    );
  }
}

export default App;
