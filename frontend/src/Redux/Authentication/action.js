import axios from "axios";
import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, LOGOUT } from "./actionType";

export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const authSuccess = (token) => ({
  type: AUTH_SUCCESS,
  payload: token,
});

export const authFailure = (error) => ({
  type: AUTH_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(authRequest());

    const response = await axios.post(
      "http://localhost:8080/user/register",
      userData
    );

    if (response.data.data) {
      localStorage.setItem("userDetails", JSON.stringify(response.data.data));
      dispatch(authSuccess(response.data.data));
    }

    return response.data;
  } catch (error) {
    dispatch(authFailure(error.message));
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(authRequest());

    // make the API call to signup the user
    const response = await axios.post(
      "http://localhost:8080/user/login",
      userData
    );
  
    if (response.data.token) {
    //   console.log("token", response.data.token);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      dispatch(authSuccess(response.data.token));
    }

    return response.data;
  } catch (error) {
    // if the response is unsuccessful, dispatch AUTH_FAILURE with the error message
    dispatch(authFailure(error.message));
  }
};

// Logout user
export const logoutFun = () => (dispatch) => {
  try {
    dispatch(logout());
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
  } catch (error) {
    dispatch(authFailure(error.message));
  }
};
