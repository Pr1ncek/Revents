import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';

class EventDashboard extends Component {
  state = {
    events: this.props.events,
    showForm: false,
    selectedEvent: null
  };

  showForm = () => this.setState({ showForm: true, selectedEvent: null });

  hideForm = () => this.setState({ showForm: false, selectedEvent: null });

  addNewEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    const events = [newEvent, ...this.state.events];
    this.setState({ events, showForm: false });
  };

  handleEventSelected = event => () => {
    this.setState({
      selectedEvent: event,
      showForm: true
    });
  };

  handleUpdateEvent = updatedEvent => {
    const newEvents = this.state.events.map(event =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    this.setState({ events: newEvents, showForm: false, selectedEvent: null });
  };

  handleDeleteEvent = eventId => () => {
    const newEvents = this.state.events.filter(event => event.id !== eventId);
    this.setState({ events: newEvents });
  };

  render() {
    const { events, showForm, selectedEvent } = this.state;
    return (
      <Grid>
        <Grid.Column width="10">
          <EventList
            events={events}
            onEventSelected={this.handleEventSelected}
            onDeleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width="6">
          <Button positive onClick={this.showForm}>
            Create Event
          </Button>
          {showForm && (
            <EventForm
              hideForm={this.hideForm}
              addNewEvent={this.addNewEvent}
              selectedEvent={selectedEvent}
              updateEvent={this.handleUpdateEvent}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps)(EventDashboard);
