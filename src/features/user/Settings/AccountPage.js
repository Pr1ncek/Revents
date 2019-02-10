import React from 'react';

import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button,
  Icon
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';

import {
  combineValidators,
  matchesField,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from 'revalidate';

const validate = combineValidators({
  password: composeValidators(
    isRequired('password'),
    hasLengthGreaterThan(5)({ message: 'Must be alteast 6 characters' })
  )(),
  confirmedPassword: composeValidators(
    isRequired({ message: 'Please confirm your password' }),
    matchesField('password')({ message: 'Paswords do not match' })
  )()
});

const AccountPage = ({
  error,
  invalid,
  submitting,
  loading,
  updatePassword,
  handleSubmit,
  providerId
}) => {
  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {providerId && providerId === 'password' && (
        <div style={{ marginBottom: '25px', padding: '15px' }}>
          <Header color="teal" sub content="Change password" />
          <p>Use this form to update your account settings</p>
          <Form onSubmit={handleSubmit(updatePassword)}>
            <Field
              width={8}
              name="password"
              type="password"
              pointing="left"
              inline={true}
              component={TextInput}
              basic={true}
              placeholder="New Password"
            />
            <Field
              width={8}
              name="confirmedPassword"
              type="password"
              inline={true}
              basic={true}
              pointing="left"
              component={TextInput}
              placeholder="Confirm Password"
            />
            <div>
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
            </div>
            <Button
              size="large"
              type="submit"
              positive
              content="Update Password"
              loading={loading}
              disabled={invalid || submitting}
            />
          </Form>
        </div>
      )}
      <Divider />
      {providerId && providerId === 'facebook.com' && (
        <div style={{ marginBottom: '20px', padding: '15px' }}>
          <Header color="teal" sub content="Facebook Account" />
          <p>Please visit Facebook to update your account settings</p>
          <Button type="button" color="facebook">
            <Icon name="facebook" />
            Go to Facebook
          </Button>
        </div>
      )}
      {providerId && providerId === 'google.com' && (
        <div style={{ padding: '15px' }}>
          <Header color="teal" sub content="Google Account" />
          <p>Please visit Google to update your account settings</p>
          <Button type="button" color="google plus">
            <Icon name="google plus" />
            Go to Google
          </Button>
        </div>
      )}
    </Segment>
  );
};

export default reduxForm({ form: 'account', validate })(AccountPage);
