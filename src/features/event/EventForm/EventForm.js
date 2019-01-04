import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class EventForm extends Component {
  state = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    const { addNewEvent } = this.props;
    const newEvent = { ...this.state };
    addNewEvent(newEvent);
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
            <Button type="button" fluid onClick={hideForm}>
              Cancel
            </Button>
          </Button.Group>
        </Form>
      </Segment>
    );
  }
}

export default EventForm;
