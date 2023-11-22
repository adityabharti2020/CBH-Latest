
import { ActionTypes } from "../constants/ActionTypes";


export const login = (data) => {
  return {
    type: ActionTypes.ADMIN_LOGIN,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: ActionTypes.ADMIN_LOGOUT,
    payload: {},
  };
};

// admin auth action
export const adminAuth = (data) => {
  return {
    type: ActionTypes.ADMIN_AUTH,
    payload: data,
  };
};