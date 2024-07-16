import { useAppState, useAppDispatch } from '../../contexts/AppContext';

export default function Chat(props) {
  const { className } = props;
  const state = useAppState();
  const dispatch = useAppDispatch();

  return (
    <div data-testid="chat" className={className}>
      <h2>Chat</h2>
      <textarea
        name="message"
        id="message"
        aria-label="chat"
        placeholder="Type your message..."
        value={state.messages[state.selectedId]}
        onChange={(event) =>
          dispatch({ type: 'message_edited', message: event.target.value })
        }
      />
      <button type="button" onClick={() => dispatch({ type: 'message_sent' })}>
        Send
      </button>
    </div>
  );
}
