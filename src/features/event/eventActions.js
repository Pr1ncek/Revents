export const eventConstants = {
  CREATE_EVENT: 'CREATE_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  FETCH_EVENTS: 'FETCH_EVENTS'
};

export const createEvent = event => {
  return {
    type: eventConstants.CREATE_EVENT,
    payload: {
      event
    }
  };
};

export const updateEvent = event => {
  return {
    type: eventConstants.UPDATE_EVENT,
    payload: {
      event
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
