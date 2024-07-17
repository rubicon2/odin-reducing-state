import Heading from './components/heading';
import AppContext from './contexts/AppContext';
import ContactList from './components/contactList';
import Chat from './components/chat';
import './App.css';

import styled from 'styled-components';

const contacts = [
  {
    id: 0,
    firstName: 'Alice',
    email: 'alice@megamail.com',
  },
  {
    id: 1,
    firstName: 'Floppo',
    email: 'floppo@supermail.com',
  },
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
`;

function App() {
  return (
    <AppContext>
      <Heading>Some Amazing Web Application</Heading>
      <Grid>
        <ContactList contacts={contacts} />
        <Chat />
      </Grid>
    </AppContext>
  );
}

export default App;
