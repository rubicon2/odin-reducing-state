export const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello',
  },
};

export default function appReducer(state, action) {
  if (!action) return state;

  switch (action.type) {
    case 'contact_selected': {
      return {
        ...state,
        selectedId: action.contactId,
      };
    }

    case 'message_edited': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: action.message,
        },
      };
    }

    case 'message_sent': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: '',
        },
      };
    }

    default: {
      throw new Error(`Action type not recognized: ${action.type}`);
    }
  }
}
