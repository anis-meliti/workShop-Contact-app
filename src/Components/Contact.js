import React, { Component } from 'react';
import { Col, Button, Row } from 'react-bootstrap';

import './contact.css';
import AddContact from './AddContact';

class Contact extends Component {
  state = {
    show: false
  };
  handleShow = () => this.setState({ show: !this.state.show });
  render() {
    const { _id, name, firstName, mail, phoneNumber } = this.props.contact;
    return (
      <Col>
        <Row>
          <span>{name}</span>
          <span>{firstName}</span>
        </Row>
        <Row>
          <span role='img' area-label='mail'>
            📧{' '}
          </span>
          <span>{mail}</span>
        </Row>
        <Row>
          <span role='img' area-label='mail'>
            📱{' '}
          </span>
          <span>{phoneNumber}</span>
        </Row>
        <Row>
          <Button
            variant='primary'
            className='ml-auto btn'
            onClick={this.handleShow}
          >
            Edit
          </Button>
          <Button
            variant='danger'
            className='mr-auto btn'
            onClick={() => this.props.deleteContact(_id)}
          >
            Delete
          </Button>
        </Row>
        {this.state.show ? (
          <AddContact
            show={this.state.show}
            handleShow={this.handleShow}
            handleAdd={this.props.handleAdd}
            isEdit={true}
            contact={this.props.contact}
          />
        ) : null}
      </Col>
    );
  }
}
export default Contact;
