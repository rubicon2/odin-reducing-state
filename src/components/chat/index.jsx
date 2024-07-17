import { useAppState, useAppDispatch } from '../../contexts/AppContext';
import Container from '../container';
import Heading from '../heading';
import styled from 'styled-components';

const ChatContainer = styled(Container)`
  background-color: lightblue;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  textarea {
    resize: none;
  }
`;

export default function Chat(props) {
  const { className } = props;
  const state = useAppState();
  const dispatch = useAppDispatch();

  return (
    <ChatContainer data-testid="chat" className={className}>
      <Heading level={2}>Chat</Heading>
      <InputContainer>
        <textarea
          name="message"
          id="message"
          aria-label="chat"
          placeholder="Type your message..."
          rows={10}
          cols={75}
          value={state.messages[state.selectedId] || ''}
          onChange={(event) =>
            dispatch({ type: 'message_edited', message: event.target.value })
          }
        />
        <button
          type="button"
          onClick={() => dispatch({ type: 'message_sent' })}
        >
          Send
        </button>
      </InputContainer>
    </ChatContainer>
  );
}
