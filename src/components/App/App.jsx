import ContactForm from '../ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import Filter from '../Filter/Filter';
import { Title, Subtitle, Container } from './App.styled';
import ContactList from '../ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { setContactFilter } from '../../redux/filterSlice';
import { addContact, deleteContact } from '../../redux/contactsSlice';
import { getContactFilter, getContacts } from '../../redux/selectors';



export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getContactFilter);

  const handlerSubmit = data => {
    const { name, number } = data;
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    if (
      contacts.find(
        contact =>
          contact.name === newContact.name ||
          contact.number === newContact.number
      )
    ) {
      return alert(
        `${newContact.name} or ${newContact.number} is already in contacts`
      );
    }
    dispatch(addContact(newContact));
  };

  const onFilter = e => {
    const { value } = e.currentTarget;
    dispatch(setContactFilter(value));
  };

  const deleteContacts = contactId => {
    dispatch(deleteContact(contactId));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={handlerSubmit} />
      <Subtitle>Contacts</Subtitle>
      <Filter value={filter} onFilter={onFilter} />
      <ContactList deleteContact={deleteContacts} contacts={filteredContacts} />
    </Container>
  );
}
