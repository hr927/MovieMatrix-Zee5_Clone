import {
  ADMIN_FAILURE,
  ADMIN_LOGOUT,
  ADMIN_REQUEST,
  ADMIN_SUCCESS,
} from "./actionType";

export const adminRequest = () => ({ type: ADMIN_REQUEST });

export const adminSuccess = (token) => ({
  type: ADMIN_SUCCESS,
  payload: token,
});

export const adminFailure = (error) => ({
  type: ADMIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: ADMIN_LOGOUT,
});

// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(adminRequest());

    const response = await axios.post(
      "http://localhost:8080/admin/register",
      userData
    );

    if (response.data.data) {
      localStorage.setItem("AdminDetails", JSON.stringify(response.data.data));
      dispatch(adminSuccess(response.data.data));
    }

    return response.data;
  } catch (error) {
    dispatch(adminFailure(error.message));
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(adminRequest());

    // make the API call to signup the user
    const response = await axios.post(
      "http://localhost:8080/admin/login",
      userData
    );

    if (response.data.token) {
      //   console.log("token", response.data.token);
      localStorage.setItem("Admin_token", JSON.stringify(response.data.token));
      dispatch(adminSuccess(response.data.token));
    }

    return response.data;
  } catch (error) {
    // if the response is unsuccessful, dispatch admin_FAILURE with the error message
    dispatch(adminFailure(error.message));
  }
};

// Logout user
export const logoutFun = () => (dispatch) => {
  try {
    dispatch(logout());
    localStorage.removeItem("AdminDetails");
    localStorage.removeItem("Admin_token");
  } catch (error) {
    dispatch(adminFailure(error.message));
  }
};
