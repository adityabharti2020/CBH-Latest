import { ActionTypes } from "../constants/ActionTypes";

const initialState = { isAuthenticated: false, isUser: false };
export const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADMIN_LOGIN:
      return { ...state, ...payload, isAuthenticated: true, isUser: true };
    case ActionTypes.ADMIN_AUTH:
      return { ...state, ...payload, isAuthenticated: true, isUser: true };
    case ActionTypes.ADMIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};