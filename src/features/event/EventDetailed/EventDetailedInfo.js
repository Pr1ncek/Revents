import React, { Component } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import EventDetailedMap from './EventDetailedMap';

class EventDetailedInfo extends Component {
  state = {
    showMap: false
  };

  toggleMap = () =>
    this.setState(prevState => ({ showMap: !prevState.showMap }));

  render() {
    const { description, date, venue, venueLatLng } = this.props.event;
    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{date}</span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{venue}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button
                color="teal"
                size="tiny"
                content={this.state.showMap ? 'Hide Map' : 'Show Map'}
                onClick={this.toggleMap}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        {this.state.showMap && (
          <EventDetailedMap lat={venueLatLng.lat} lng={venueLatLng.lng} />
        )}
      </Segment.Group>
    );
  }
}

export default EventDetailedInfo;
