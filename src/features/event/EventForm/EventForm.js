import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import cuid from 'cuid';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';

const categories = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

class EventForm extends Component {
  handleSubmit = values => {
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      this.props.createEvent({
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Prince',
        attendees: []
      });
      this.props.history.push('/events');
    }
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
              <Field
                name="title"
                type="text"
                placeholder="Give your event a name"
                component={TextInput}
              />
              <Field
                name="category"
                placeholder="What is your event about"
                options={categories}
                component={SelectInput}
              />
              <Field
                name="description"
                rows={3}
                placeholder="Tell us about your event"
                component={TextArea}
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                type="text"
                placeholder="Event City"
                component={TextInput}
              />
              <Field
                name="venue"
                type="text"
                placeholder="Event Venue"
                component={TextInput}
              />
              <Field
                name="date"
                type="text"
                placeholder="Event Date"
                component={TextInput}
              />
              <Button.Group widths="6">
                <Button positive type="submit" fluid>
                  Submit
                </Button>
                <Button type="button" fluid onClick={this.props.history.goBack}>
                  Cancel
                </Button>
              </Button.Group>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};
  if (eventId && state.events.length > 0) {
    event = state.events.find(event => event.id === eventId);
  }

  return { initialValues: event };
};

export default connect(
  mapStateToProps,
  { createEvent, updateEvent }
)(reduxForm({ form: 'eventForm', enableReinitialize: true })(EventForm));
