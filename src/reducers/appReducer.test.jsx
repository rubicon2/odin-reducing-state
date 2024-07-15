import appReducer from './appReducer';

// This is the same as in the reducer, but separate copy here in case we want to change the test data.
const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello',
  },
};

describe('App reducer', () => {
  it('Should return the initial state', () => {
    expect(appReducer(initialState)).toEqual(initialState);
  });

  it('Handles action type: contact_selected', () => {
    const action = {
      type: 'contact_selected',
      contactId: 1,
    };

    expect(appReducer(initialState, action)).toEqual({
      ...initialState,
      selectedId: 1,
    });
  });

  it('Handles action type: message_edited', () => {
    const action = {
      type: 'message_edited',
      message: 'What are you having for dinner?',
    };

    expect(appReducer(initialState, action)).toEqual({
      ...initialState,
      messages: {
        0: 'What are you having for dinner?',
      },
    });
  });

  it('Handles action type: message_sent', () => {
    expect(appReducer(initialState, { type: 'message_sent' })).toEqual({
      ...initialState,
      messages: {
        0: '',
      },
    });
  });

  it('Throws an error if the action type is not recognized', () => {
    expect(() =>
      appReducer(initialState, { type: 'some_unknown_thing_happened' }),
    ).toThrowError();
  });

  it('Stores a draft message for each selectedId', () => {
    const action = {
      type: 'message_edited',
      message: 'How do you like your coffee?',
    };

    expect(
      appReducer({ ...initialState, selectedId: 7 }, action).messages,
    ).toEqual({
      0: 'Hello',
      7: 'How do you like your coffee?',
    });
  });
});
