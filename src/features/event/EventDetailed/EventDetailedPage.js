import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import EventDetailedHeader from './EventDetailedHeader';

function EventDetailedPage(props) {
  let event = {};
  const eventId = props.match.params.id;

  if (eventId && props.events.length > 0) {
    event = props.events.find(event => event.id === eventId);
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
}

const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps)(EventDetailedPage);
