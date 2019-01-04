import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import Navbar from '../../features/nav/Navbar/Navbar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Container className="main">
          <EventDashboard />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;