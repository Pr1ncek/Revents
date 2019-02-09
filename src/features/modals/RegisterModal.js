import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { closeModal } from './modalActions';
import RegisterForm from '../auth/Register/RegisterForm';

const actions = { closeModal };

class RegisterModal extends Component {
  render() {
    return (
      <Modal size="tiny" open={true} onClose={this.props.closeModal}>
        <Modal.Header style={{ textAlign: 'center' }}>
          Sign Up to Re-vents!
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <RegisterForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(
  null,
  actions
)(RegisterModal);
