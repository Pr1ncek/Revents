import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    const { onEventSelected, onDeleteEvent } = this.props;
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
            <Icon name="clock" /> {date} |
            <Icon name="marker" /> {venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {attendees &&
              attendees.map(attendee => (
                <EventListAttendee key={attendee.id} attendee={attendee} />
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
            onClick={onDeleteEvent(id)}
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
