import React from 'react';
import axios from 'axios';
import Contact from './Components/Contact';
import { Container, Row } from 'react-bootstrap';

import AddContact from './Components/AddContact';

class App extends React.Component {
  state = { contacts: [], show: false };

  handleShow = () => this.setState({ show: !this.state.show });

  getAllContacts = () =>
    axios.get('/contacts').then(response =>
      this.setState({
        contacts: response.data
      })
    );

  handleDelete = id =>
    axios.delete(`deleteContact/${id}`).then(this.getAllContacts());

  handleAdd = newContact =>
    axios.post('/newContact', newContact).then(this.getAllContacts());
  handleEdit = editedContact => {
    console.log('TCL: App -> editedContact', editedContact);
    axios
      .put(`/editContact/${editedContact.id}`, {
        name: editedContact.name,
        firstName: editedContact.firstName,
        phoneNumber: editedContact.phoneNumber,
        mail: editedContact.mail
      })
      .then(this.getAllContacts());
  };
  componentDidMount() {
    this.getAllContacts();
  }
  render() {
    return (
      <Container>
        {this.state.contacts.map((contact, key) => (
          <Row className='mt-3'>
            <Contact
              contact={contact}
              key={key}
              deleteContact={this.handleDelete}
              handleAdd={this.handleEdit}
            />
          </Row>
        ))}
        <Row>
          <AddContact
            show={this.state.show}
            handleShow={this.handleShow}
            handleAdd={this.handleAdd}
          />
        </Row>
      </Container>
    );
  }
}

export default App;
