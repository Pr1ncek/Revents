import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Grid } from 'semantic-ui-react';
import SettingsNav from './SettingsNav';
import AboutPage from './AboutPage';
import BasicPage from './BasicPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';

import { updatePassword } from '../../auth/authActions';
import { updateProfile } from '../userActions';

function SettingsDashboard({
  async,
  updatePassword,
  providerId,
  userProfile,
  updateProfile,
  auth,
  photos
}) {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route
            path="/settings/basic"
            render={() => (
              <BasicPage
                initialValues={userProfile}
                updateProfile={updateProfile}
                loading={async.loading}
              />
            )}
          />
          <Route
            path="/settings/about"
            render={() => (
              <AboutPage
                initialValues={userProfile}
                updateProfile={updateProfile}
                loading={async.loading}
              />
            )}
          />
          <Route
            path="/settings/photos"
            render={() => (
              <PhotosPage
                loading={async.loading}
                auth={auth}
                photos={photos}
                userProfile={userProfile}
              />
            )}
          />
          <Route
            path="/settings/account"
            render={() => (
              <AccountPage
                loading={async.loading}
                updatePassword={updatePassword}
                providerId={providerId}
              />
            )}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
}

const mapStateToProps = state => ({
  async: state.async,
  providerId: state.firebase.auth.providerData[0].providerId,
  userProfile: state.firebase.profile,
  auth: state.firebase.auth,
  photos: state.firestore.ordered.photos
});

export default connect(
  mapStateToProps,
  { updatePassword, updateProfile }
)(SettingsDashboard);
