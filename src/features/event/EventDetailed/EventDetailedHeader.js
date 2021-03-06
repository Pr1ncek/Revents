import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';

const eventImageStyle = {
  filter: 'brightness(30%)'
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

export default function EventDetailedHeader({ event }) {
  const { category, title, date, hostedBy, id } = event;

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={title}
                  style={{ color: 'white', paddingBottom: '10px' }}
                />
                <p>{format(date, 'dddd Do MMMM')}</p>
                <p>
                  Hosted by <strong>{hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" style={{ padding: '15px' }}>
        <Button>Cancel My Place</Button>
        <Button color="teal">JOIN THIS EVENT</Button>

        <Button color="orange" floated="right" as={Link} to={`/manage/${id}`}>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
}
