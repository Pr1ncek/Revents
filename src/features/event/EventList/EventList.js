import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const { events, onEventSelected, onDeleteEvent } = this.props;
    return (
      <div>
        {events.map(event => (
          <EventListItem
            key={event.id}
            event={event}
            onEventSelected={onEventSelected}
            onDeleteEvent={onDeleteEvent}
          />
        ))}
      </div>
    );
  }
}

export default EventList;
