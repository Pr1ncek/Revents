import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import cuid from 'cuid';

const event = {
  title: '',
  date: '',
  category: 'culture',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
    'Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus.' +
    'Sed eget ipsum vel arcu vehicula ullamcorper.',
  city: '',
  venue: '',
  hostedBy: '',
  hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
  attendees: []
};

class EventForm extends Component {
  state = { ...event, id: this.props.match.params.id };

  componentDidMount() {
    let event = {};
    if (this.state.id && this.props.events.length > 0) {
      event = this.props.events.find(event => event.id === this.state.id);
    }
    this.setState({ ...event });
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.id) {
      this.props.updateEvent({ ...this.state });
    } else {
      this.props.createEvent({ ...this.state, id: cuid() });
    }
    this.props.history.push('/events');
  };

  render() {
    const { hideForm } = this.props;
    const { title, date, city, venue, hostedBy } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              placeholder="Event Title"
              value={title}
              name="title"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              type="date"
              placeholder="Event Date"
              value={date}
              name="date"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              placeholder="City event is taking place"
              value={city}
              name="city"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              placeholder="Enter the Venue of the event"
              value={venue}
              name="venue"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              placeholder="Enter the name of person hosting"
              value={hostedBy}
              name="hostedBy"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button.Group widths="6">
            <Button positive type="submit" fluid>
              Submit
            </Button>
            <Button
              type="button"
              fluid
              onClick={() => this.props.history.goBack()}
            >
              Cancel
            </Button>
          </Button.Group>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events
});

export default connect(
  mapStateToProps,
  { createEvent, updateEvent }
)(EventForm);
