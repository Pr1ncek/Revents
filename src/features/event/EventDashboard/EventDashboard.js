import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

import { deleteEvent } from '../eventActions';

class EventDashboard extends Component {
  render() {
    const { events, loading } = this.props;

    if (loading || !events) return <LoadingComponent inverted={true} />;

    return (
      <Grid>
        <Grid.Column width="10">
          <EventList events={events} deleteEvent={this.props.deleteEvent} />
        </Grid.Column>
        <Grid.Column width="6">
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  events: state.firestore.ordered.events,
  loading: state.async.loading
});

export default connect(
  mapStateToProps,
  { deleteEvent }
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
