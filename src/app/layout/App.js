import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import Navbar from '../../features/nav/Navbar/Navbar';
import EventForm from '../../features/event/EventForm/EventForm';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import HomePage from '../../features/home/HomePage';
import TestPlayground from '../../features/playground/TestPlayground';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
        <Route
          path="/(.+)"
          render={() => (
            <React.Fragment>
              <Navbar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={EventDashboard} />
                  <Route path="/event/:id" component={EventDetailedPage} />
                  <Route path="/manage/:id" component={EventForm} />
                  <Route path="/people" component={PeopleDashboard} />
                  <Route path="/profile/:id" component={UserDetailedPage} />
                  <Route path="/settings" component={SettingsDashboard} />
                  <Route path="/createEvent" component={EventForm} />
                  <Route path="/playground" component={TestPlayground} />
                </Switch>
              </Container>
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
  q;
}

export default App;
