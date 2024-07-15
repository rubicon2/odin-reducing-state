import ContactList from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';

const contactsTestSets = [
  [
    [
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
  ],
  [
    [
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
  ],
];

describe('Contact list', () => {
  it('Renders a list', () => {
    render(<ContactList />);
    expect(screen.getByRole('list')).toBeDefined();
  });

  it.each(contactsTestSets)(
    'Render n list items when provided a contacts prop array of length n - test %#',
    (contacts) => {
      render(<ContactList contacts={contacts} />);
      expect(screen.getAllByRole('listitem').length).toBe(contacts.length);
    },
  );

  it.each(contactsTestSets)(
    'Render the name of each contact in the contacts prop array - test %#',
    (contacts) => {
      render(<ContactList contacts={contacts} />);
      for (const contact of contacts) {
        expect(screen.getByText(contact.firstName)).toBeInTheDocument();
      }
    },
  );

  it.each(contactsTestSets)(
    'Calls the onContactSelected prop function if a contact is selected - test %#',
    async (contacts) => {
      const user = userEvent.setup();
      const mock = vi.fn();
      render(<ContactList contacts={contacts} onContactSelected={mock} />);

      for (const contact of contacts) {
        const element = screen.getByText(contact.firstName);
        await user.click(element);
        expect(mock).toHaveBeenCalledTimes(1);
        vi.clearAllMocks();
      }
    },
  );

  it('Does not throw an error if supplied with no contacts prop array, or an array of length zero', () => {
    expect(() => render(<ContactList />)).not.toThrowError();
  });

  it('Does not throw error if supplied with no onContactSelected prop function', () => {
    expect(() =>
      render(<ContactList contacts={contactsTestSets[0]} />),
    ).not.toThrowError();
  });

  it('Throws an error if contacts prop is not an array', () => {
    expect(() =>
      render(<ContactList contacts={'not an array'} />),
    ).toThrowError();
  });

  it('Throws an error if onContactSelected prop is not a function', () => {
    expect(() =>
      render(
        <ContactList
          contacts={contactsTestSets[0]}
          onContactSelected={'not a function'}
        />,
      ),
    ).toThrowError();
  });

  it('Applies className prop to the root element of the component', () => {
    render(<ContactList className={'someClass'} />);
    expect(screen.getByTestId('contact-list').classList).toContain('someClass');
  });
});
