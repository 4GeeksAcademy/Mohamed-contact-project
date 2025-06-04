export const initialStore = () => ({
  BASE_URL: "https://playground.4geeks.com/contact/agendas",
  SLUG: "Mohamed",
  message: null,
  contacts: []
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_contacts': {
      //  a new array
      return {
        ...store,
        contacts: action.payload.contacts
      };
    }
    case 'add_contact': {
      // Add a new contact 
      return {
        ...store,
        contacts: [...store.contacts, action.payload.contact]
      };
    }
    case 'delete_contact': {
      // Remove a contact by id
      return {
        ...store,
        contacts: store.contacts.filter(
          contact => contact.id !== action.payload.id
        )
      };
    }
    case 'update_contact': {
      // Update a contact by id
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === action.payload.contact.id
            ? { ...contact, ...action.payload.contact }
            : contact
        )
      };
    }
    default:
      throw Error('Unknown action.');
  }
}