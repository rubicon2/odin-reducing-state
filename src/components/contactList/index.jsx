import { useAppDispatch } from '../../contexts/AppContext';
import Container from '../container';
import Heading from '../heading';
import styled from 'styled-components';

const ContactListContainer = styled(Container)`
  background-color: pink;
`;

const Contacts = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  gap: 0.5em;
`;

const ContactsItem = styled.li`
  font-weight: 700;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export default function ContactList(props) {
  const { contacts = [], className } = props;
  const dispatch = useAppDispatch();

  // This function will throw an error regardless of whether we check, but this error message is clearer.
  if (!Array.isArray(contacts))
    throw new Error('contacts prop is not an array');

  return (
    <ContactListContainer data-testid="contact-list" className={className}>
      <Heading level={2}>Contacts</Heading>
      <Contacts>
        {contacts.map((contact) => (
          <ContactsItem
            key={contact.id}
            onClick={() => {
              dispatch({ type: 'contact_selected', contactId: contact.id });
            }}
          >
            {contact.firstName}
          </ContactsItem>
        ))}
      </Contacts>
    </ContactListContainer>
  );
}
