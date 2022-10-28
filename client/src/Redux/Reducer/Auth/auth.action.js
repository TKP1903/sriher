import axios from "axios";

//Redux types
import { SIGN_IN, SIGN_UP, SIGN_OUT, ERROR } from "./auth.type";
import { clearUser } from "../User/user.action";
import { setError, hideError } from "../Errors/error.type";
import { API_URL, CLIENT_URL } from "../../../key";

export const signIn = (userData) => async (dispatch) => {
  try {
    const User = await axios({
      method: "POST",
      url: `${API_URL}/auth/signin`,
      data: { credentials: userData },
    }).then((response) => {
      return response;
    });
    const userRole = User.data.userRole;
    localStorage.setItem("SRCUser", JSON.stringify({ token: User.data.token }));
    if (userRole === "user") {
      window.location.href = `${CLIENT_URL}/events`;
    }
    if (userRole === "admin") {
      window.location.href = "/admin";
    }

    return dispatch({ type: SIGN_IN, payload: User.data });
  } catch (error) {
    setError(error);
    return dispatch({ type: ERROR, payload: error });
  }
};

export const signUp = (userData) => async (dispatch) => {
  try {
    const User = await axios({
      method: "POST",
      url: `${API_URL}/auth/signup`,
      data: { credentials: userData },
    }).then((response) => {
      return response;
    });
    localStorage.setItem("SRCUser", JSON.stringify({ token: User.data.token }));
    // window.location.href = `${CLIENT_URL}`
    window.location.href = `${CLIENT_URL}/events`;

    return dispatch({ type: SIGN_UP, payload: User.data });
  } catch (error) {
    return dispatch({ type: ERROR, payload: error });
  }
};


export const addUserByAdmin = (userData) => async (dispatch) => {
    try {
        const User = await axios({
            method: "POST",
            url: `${API_URL}/auth/signup`,
            data: { credentials: userData }
        }).then((response) => {
            return response;
        });                
        return dispatch({ type: SIGN_UP , payload:  User.data });
    } catch (error) {
        return dispatch({ type: ERROR, payload: error });
    }
}



export const signOut = () => async (dispatch) => {
    try {
      localStorage.removeItem("SRCUser");
      clearUser();
      window.location.reload(false);
      window.location.href = "/"
      
      return dispatch({ type: SIGN_OUT, payload: {} });
    } catch (error) {
      return dispatch({ type: ERROR, payload: error });
    }
  };