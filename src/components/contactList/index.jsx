export default function ContactList(props) {
  const { contacts = [], onContactSelected = () => {} } = props;

  // This function will throw an error regardless of whether we check, but this error message is clearer.
  if (!Array.isArray(contacts))
    throw new Error('contacts prop is not an array');

  if (typeof onContactSelected !== 'function')
    throw new Error('onContactSelected prop is not a function');

  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li onClick={onContactSelected}>{contact.firstName}</li>
        ))}
      </ul>
    </div>
  );
}
