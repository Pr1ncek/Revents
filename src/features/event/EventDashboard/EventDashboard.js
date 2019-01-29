import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';

class EventDashboard extends Component {
  render() {
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width="10">
          <EventList events={events} deleteEvent={this.props.deleteEvent} />
        </Grid.Column>
        <Grid.Column width="6" />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events
});

export default connect(
  mapStateToProps,
  { deleteEvent }
)(EventDashboard);
