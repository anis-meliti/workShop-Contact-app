import React, { Component } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';

class AddContact extends Component {
  state = {
    name: '',
    firstName: '',
    mail: '',
    phoneNumber: ''
  };
  componentDidMount() {
    this.props.isEdit
      ? this.setState({
          name: this.props.contact.name,
          firstName: this.props.contact.firstName,
          phoneNumber: this.props.contact.phoneNumber,
          mail: this.props.contact.mail,
          id: this.props.contact._id
        })
      : this.setState({
          name: '',
          firstName: '',
          mail: '',
          phoneNumber: ''
        });
  }
  changeHandler = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { show, handleShow, handleAdd } = this.props;
    return (
      <>
        <Button variant='primary' onClick={handleShow}>
          Add contact
        </Button>

        <Modal show={show} onHide={handleShow} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              type='text'
              name='name'
              defaultValue={this.state.name}
              placeholder='Please Enter a name....'
              onChange={this.changeHandler}
            />
            <FormControl
              type='text'
              defaultValue={this.state.firstName}
              name='firstName'
              placeholder='Please Enter a first name....'
              onChange={this.changeHandler}
            />
            <FormControl
              type='text'
              name='mail'
              defaultValue={this.state.mail}
              placeholder='Please Enter a mail....'
              onChange={this.changeHandler}
            />
            <FormControl
              type='text'
              name='phoneNumber'
              defaultValue={this.state.phoneNumber}
              placeholder='Please Enter a phone number....'
              onChange={this.changeHandler}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleShow}>
              Close
            </Button>
            <Button
              variant='primary'
              onClick={() => {
                handleAdd(this.state);
                handleShow();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AddContact;
