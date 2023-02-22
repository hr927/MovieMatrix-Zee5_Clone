import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, LOGOUT } from "./actionType";

const initialState = {
  isAuth: false,
  user: null,
  error: false,
  loading: false,
  token: null,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        user: payload,
        error: false,
        loading: false,
        token: payload.token ? state.token : null,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        user: null,
        error: false,
        loading: false,
      };
    default:
      return state;
  }
};

// export default authReducer;
