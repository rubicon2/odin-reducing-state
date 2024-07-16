import ContactList from '.';
import AppContext from '../../contexts/AppContext';
import { afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const contactsTestSets = [
  [
    {
      length: 2,
      contacts: [
        {
          id: 0,
          firstName: 'Joanna',
          email: 'jo@megamail.com',
        },
        {
          id: 1,
          firstName: 'Alice',
          email: 'alice@supermail.com',
        },
      ],
    },
  ],
  [
    {
      length: 3,
      contacts: [
        {
          id: 7,
          firstName: 'Jimmy',
          email: 'jimmy@megamail.com',
        },
        {
          id: 9,
          firstName: 'Timmy',
          email: 'timmy@supermail.com',
        },
        {
          id: 13,
          firstName: 'Milena',
          email: 'milena@ultramail.com',
        },
      ],
    },
  ],
];

// Store reference to mock returned by mocked useAppDispatch, as we need to check if this gets called later.
let dispatchMock = null;
vi.mock('../../contexts/AppContext', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    useAppDispatch: vi.fn(() => {
      // Just wrap original in mock function so we can check how many times it has been called.
      dispatchMock = vi.fn(original.useAppDispatch());
      return dispatchMock;
    }),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

function wrapWithContext(jsx) {
  return <AppContext>{jsx}</AppContext>;
}

describe('Contact list', () => {
  it('Renders a list', () => {
    render(wrapWithContext(<ContactList />));
    expect(screen.getByRole('list')).toBeDefined();
  });

  it.each(contactsTestSets)(
    'Render $length list items when provided a contacts prop array of length $length',
    (data) => {
      const { contacts } = data;
      render(wrapWithContext(<ContactList contacts={contacts} />));
      expect(screen.getAllByRole('listitem').length).toBe(contacts.length);
    },
  );

  it.each(contactsTestSets)(
    'Render the name of each contact in the contacts prop array when provided a contacts prop array of length $length',
    (data) => {
      const { contacts } = data;
      render(wrapWithContext(<ContactList contacts={contacts} />));
      for (const contact of contacts) {
        expect(screen.getByText(contact.firstName)).toBeInTheDocument();
      }
    },
  );

  it.each(contactsTestSets)(
    "Upon contact selection, dispatches an action of type 'contact_selected' when provided a contacts prop array of length $length",
    async (data) => {
      const user = userEvent.setup();
      const { contacts } = data;
      render(wrapWithContext(<ContactList contacts={contacts} />));

      for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        await user.click(screen.getByText(contact.firstName));
        expect(dispatchMock).toHaveBeenCalledTimes(i + 1);
      }
    },
  );

  it('Does not throw an error if supplied with no contacts prop array, or an array of length zero', () => {
    expect(() => render(wrapWithContext(<ContactList />))).not.toThrowError();
  });

  it('Throws an error if contacts prop is not an array', () => {
    expect(() =>
      render(wrapWithContext(<ContactList contacts={'not an array'} />)),
    ).toThrowError();
  });

  it('Applies className prop to the root element of the component', () => {
    render(wrapWithContext(<ContactList className={'someClass'} />));
    expect(screen.getByTestId('contact-list').classList).toContain('someClass');
  });
});
