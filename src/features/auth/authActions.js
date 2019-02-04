export const authConstants = {
  LOGIN_USER: 'LOGIN_USER',
  SIGNOUT_USER: 'SIGNOUT_USER',
  REGISTER_USER: 'REGISTER_USER'
};

export const login = credentials => {
  return {
    type: authConstants.LOGIN_USER,
    payload: { credentials }
  };
};

export const signout = () => {
  return { type: authConstants.SIGNOUT_USER };
};
