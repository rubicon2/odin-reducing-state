import { useAppDispatch } from '../../contexts/AppContext';

export default function ContactList(props) {
  const { contacts = [], className } = props;
  const dispatch = useAppDispatch();

  // This function will throw an error regardless of whether we check, but this error message is clearer.
  if (!Array.isArray(contacts))
    throw new Error('contacts prop is not an array');

  return (
    <div data-testid="contact-list" className={className}>
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            onClick={() => {
              dispatch({ type: 'contact_selected', contactId: contact.id });
            }}
          >
            {contact.firstName}
          </li>
        ))}
      </ul>
    </div>
  );
}
