import { toastr } from 'react-redux-toastr';

export const eventConstants = {
  CREATE_EVENT: 'CREATE_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  FETCH_EVENTS: 'FETCH_EVENTS'
};

export const createEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: eventConstants.CREATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success('Success!', 'Event has been created');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const updateEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: eventConstants.UPDATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success('Success!', 'Event has been updated');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const deleteEvent = eventId => {
  return {
    type: eventConstants.DELETE_EVENT,
    payload: {
      eventId
    }
  };
};
