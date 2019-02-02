import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => <Icon name="marker" size="big" color="red" />;

class TestPlayground extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDCTSt_rLjoxGH_pAI71SWqGWq_9XvEbrs' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default TestPlayground;
