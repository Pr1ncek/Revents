import React from 'react';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';

import { registerUser } from '../authActions';

const RegisterForm = ({ registerUser, handleSubmit, error, async }) => {
  const { loading } = async;
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error && (
            <Label
              basic
              color="red"
              style={{
                width: '100% ',
                textAlign: 'center',
                padding: '10px',
                marginBottom: '20px'
              }}
            >
              {error}
            </Label>
          )}
          <Button fluid size="large" color="teal" loading={loading}>
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  async: state.async
});

export default connect(
  mapStateToProps,
  { registerUser }
)(reduxForm({ form: 'registerForm' })(RegisterForm));
