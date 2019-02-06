import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import moment from 'moment';
import { createEvent, updateEvent } from '../eventActions';
import cuid from 'cuid';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

const categories = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'The event category is required' }),
  description: composeValidators(
    isRequired({ message: 'The event description is required' }),
    hasLengthGreaterThan(15)({ message: 'Must be alteast 15 characters' })
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
});

class EventForm extends Component {
  handleSubmit = values => {
    values.date = moment(values.date).isValid()
      ? moment(values.date).format()
      : moment(new Date());
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
    const { invalid, submitting, pristine } = this.props;
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
                placeholder="Date and Time of event"
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                component={DateInput}
              />
              <Button.Group widths="6" style={{ paddingTop: '20px' }}>
                <Button
                  positive
                  type="submit"
                  fluid
                  disabled={invalid || submitting || pristine}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  fluid
                  onClick={() => this.props.history.push('/events')}
                >
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
)(
  reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(
    EventForm
  )
);
