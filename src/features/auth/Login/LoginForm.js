import React from 'react';
import { connect } from 'react-redux';

import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';

import { login, socialLogin } from '../authActions';

const LoginForm = ({
  login,
  handleSubmit,
  error,
  async,
  submitting,
  socialLogin
}) => {
  const { loading } = async;
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
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
          disabled={submitting}
        >
          Login
        </Button>
        <Divider horizontal style={{ textAlign: 'center', padding: '10px' }}>
          OR
        </Divider>
        <SocialLogin socialLogin={socialLogin} />
      </Segment>
    </Form>
  );
};

const mapStateToProps = state => ({
  async: state.async
});

export default connect(
  mapStateToProps,
  { login, socialLogin }
)(reduxForm({ form: 'loginForm' })(LoginForm));
