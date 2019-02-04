import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { openModal } from '../modals/modalActions';
import { connect } from 'react-redux';

class TestPlayground extends Component {
  render() {
    const { openModal } = this.props;
    return (
      <div>
        <Button
          color="teal"
          content="Open Modal"
          onClick={() => openModal('TestModal', { data: 100 })}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { openModal }
)(TestPlayground);
