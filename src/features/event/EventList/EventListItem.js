import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { Segment, Item, List, Button, Icon } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
  render() {
    const {
      hostPhotoURL,
      title,
      hostedBy,
      date,
      venue,
      description,
      attendees,
      id
    } = this.props.event;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(date.seconds, 'dddd Do MMMM')} at{' '}
            {format(date.seconds, 'HH:mm')} |
            <Icon name="marker" /> {venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {attendees &&
              Object.values(attendees).map((attendee, index) => (
                <EventListAttendee key={index} attendee={attendee} />
              ))}
          </List>
        </Segment>

        <Segment clearing>
          <h5>{description}</h5>
          <Button
            as="a"
            color="red"
            floated="right"
            content="Delete"
            onClick={() => this.props.deleteEvent(id)}
          />
          <Button
            as={Link}
            color="teal"
            floated="right"
            content="View"
            to={`/event/${id}`}
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
