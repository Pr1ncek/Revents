import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { connect } from 'react-redux';
import { openModal } from '../../modals/modalActions';
import { signout } from '../../auth/authActions';

class Navbar extends Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.signout();
    this.props.history.push('/');
  };

  render() {
    const { authenticated, currentUser } = this.props.auth;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header as={Link} to="/">
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>

          <Menu.Item name="Events" as={NavLink} to="/events" />
          {authenticated && (
            <React.Fragment>
              <Menu.Item name="People" as={NavLink} to="/people" />
              <Menu.Item name="Playground" as={NavLink} to="/playground" />
              <Menu.Item>
                <Button
                  as={Link}
                  to="/createEvent"
                  floated="right"
                  positive
                  inverted
                  content="Create Event"
                />
              </Menu.Item>
            </React.Fragment>
          )}
          {authenticated ? (
            <SignedInMenu
              currentUser={currentUser}
              signOut={this.handleSignOut}
            />
          ) : (
            <SignedOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { openModal, signout }
  )(Navbar)
);
