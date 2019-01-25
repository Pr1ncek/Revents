export const createReducer = (initialState, actionsMap) => {
  return (state = initialState, { type, payload }) => {
    const handler = actionsMap[type];
    return handler ? handler(state, payload) : state;
  };
};
