import React from 'react';
import { Form } from 'semantic-ui-react';

function RadioInput({ input, label, width, type }) {
  return (
    <Form.Field>
      <div className="ui radio">
        <input {...input} type={type} />
        <label style={{ marginLeft: '5px' }}>{label}</label>
      </div>
    </Form.Field>
  );
}

export default RadioInput;
