import React from 'react';
import { connect } from 'react-redux';
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from 'revalidate';

import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';

import { registerUser, socialLogin } from '../authActions';

const validate = combineValidators({
  displayName: isRequired('name'),
  email: isRequired('email'),
  password: composeValidators(
    isRequired('password'),
    hasLengthGreaterThan(5)({ message: 'Must be alteast 6 characters' })
  )()
});

const RegisterForm = ({
  registerUser,
  handleSubmit,
  error,
  async,
  invalid,
  submitting,
  socialLogin
}) => {
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
          <Button
            fluid
            size="large"
            color="teal"
            loading={loading}
            disabled={invalid || submitting}
          >
            Register
          </Button>
          <Divider horizontal style={{ textAlign: 'center', padding: '10px' }}>
            OR
          </Divider>
          <SocialLogin socialLogin={socialLogin} />
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
  { registerUser, socialLogin }
)(reduxForm({ form: 'registerForm', validate })(RegisterForm));
