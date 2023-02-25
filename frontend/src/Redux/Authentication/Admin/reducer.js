import {
  ADMIN_FAILURE,
  ADMIN_LOGOUT,
  ADMIN_REQUEST,
  ADMIN_SUCCESS,
} from "./actionType";

const initialState = {
  isAuth: false,
  admin: null,
  error: false,
  loading: false,
  admin_token: null,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADMIN_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case ADMIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        admin: payload,
        error: false,
        loading: false,
        admin_token: payload,
      };
    case ADMIN_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case ADMIN_LOGOUT:
      return {
        ...state,
        isAuth: false,
        admin: null,
        error: false,
        loading: false,
        admin_token: null,
      };
    default:
      return state;
  }
};
