import Chat from '.';
import AppContext from '../../contexts/AppContext';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const initialState = {
  selectedId: 0,
  messages: {
    0: 'A message for one',
    7: 'A message for seven',
  },
};

describe('Chat interface', () => {
  it('Renders a text box', () => {
    render(
      <AppContext>
        <Chat />
      </AppContext>,
    );
    expect(screen.getByRole('textbox')).toBeDefined();
  });

  it.each([[initialState], [{ ...initialState, selectedId: 7 }]])(
    'Renders a draft of the message to the currently selected contact - selectedId: $selectedId',
    (state) => {
      render(
        <AppContext initialState={state}>
          <Chat />
        </AppContext>,
      );
      expect(
        screen.getByText(state.messages[state.selectedId]),
      ).toBeInTheDocument();
    },
  );

  it('Updates textbox with keyboard input', async () => {
    const user = userEvent.setup();
    render(
      <AppContext initialState={initialState}>
        <Chat />
      </AppContext>,
    );

    const input = screen.getByRole('textbox');
    await user.clear(input);
    const newMessage = 'This is a new message.';
    await user.type(input, newMessage);
    expect(screen.getByText(newMessage)).toBeInTheDocument();
  });

  it('Renders a send button', () => {
    render(
      <AppContext>
        <Chat />
      </AppContext>,
    );
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('Clear draft when message sent', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <AppContext initialState={initialState}>
        <Chat />
      </AppContext>,
    );

    const input = screen.getByText(
      initialState.messages[initialState.selectedId],
    );
    expect(input).toBeDefined();

    const sendButton = screen.getByRole('button', { name: /send/i });
    await user.click(sendButton);

    rerender(
      <AppContext>
        <Chat />
      </AppContext>,
    );
    expect(input.value).toBe('');
  });

  it('Renders an empty string, and therefore placeholder text, if there is no saved draft message for selected contact', () => {
    render(
      <AppContext initialState={{ ...initialState, selectedId: 97 }}>
        <Chat />
      </AppContext>,
    );
    expect(screen.getByRole('textbox').value).toBe('');
    expect(
      screen.getByPlaceholderText(/type your message/i),
    ).toBeInTheDocument();
  });

  it('Applies className prop to the root element of the component', () => {
    render(
      <AppContext>
        <Chat className="someClass" />
      </AppContext>,
    );
    expect(screen.getByTestId('chat').classList).toContain('someClass');
  });
});
