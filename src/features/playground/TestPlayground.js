import React from 'react';
import Script from 'react-load-script';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

class TestPlayground extends React.Component {
  state = { address: '', scriptLoaded: false };

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  };

  onChange = address => {
    this.setState({ address });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCTSt_rLjoxGH_pAI71SWqGWq_9XvEbrs&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && (
            <PlacesAutocomplete inputProps={inputProps} />
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default TestPlayground;

// AIzaSyDCTSt_rLjoxGH_pAI71SWqGWq_9XvEbrs -- Maps JavaScript API
