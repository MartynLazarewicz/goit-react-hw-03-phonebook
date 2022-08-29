import { Component } from 'react';
import { Contacts } from './Contacts/Contcts';
import { PhoneForm } from './PhoneForm/PhoneForm';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('contacts');
      const contacts = JSON.parse(json);

      if (contacts) {
        this.setState(() => ({ contacts: contacts }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const json = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', json);
    }
  }

  filterByName = e => {
    const { filter, contacts } = this.state;
    if (filter === '') {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  contactSubmit = values => {
    const { contacts } = this.state;
    const nameArray = contacts.map(contact => {
      return contact.name;
    });
    if (nameArray.includes(values.name)) {
      return alert(`${values.name} is already in contacts.`);
    }
    return this.setState(({ contacts }) => ({
      contacts: [values, ...contacts],
    }));
  };

  toDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <PhoneForm onSubmit={this.contactSubmit} />
        <title>Contacts</title>
        <Filter value={filter} filterByName={this.handleChange} />
        <Contacts filterByName={this.filterByName} toDelete={this.toDelete} />
      </div>
    );
  }
}
