import axios from "axios";

//Redux types
import { SELF, CLEAR_USER, UPDATE_USER, DELETE_USER, GET_USERS, ADD_USER, GET_SPECIFIC_USER, ALL_USERS } from "./user.type";

import { API_URL } from "../../../key";

export const getUser = (_id) => async (dispatch) => {
    try {
        const User = await axios({
            method: "GET",
            url: `${API_URL}/user/${_id}`
        }).then((response) => {
            return response;
        });        
        return dispatch({ type: GET_USERS, payload: User.data });
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}
export const getAllUsers = () => async (dispatch) => {
    try {
        const userList = await axios({
            method: "GET",
            url: `${API_URL}/user/allusers`
        }).then((response) => {
            return response;
        });        
        return dispatch({ type: ALL_USERS, payload: userList.data });
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}
// export const getSpecificUser = (_id) => async (dispatch) => {
//     try {
//         const specificProjectList = await axios({
//             method: "GET",
//             url: `${API_URL}/user/get/${_id}`
//         }).then((response) => {
//             return response;
//         });
//         return dispatch({ type: GET_SPECIFIC_USER, payload: specificProjectList.data });
//     } catch (error) {   
//         return dispatch({ type: "ERROR", payload: error });
//     }
// }

export const addUser = (userData) => async (dispatch) => {
    try {
        const user = await axios({
            method: "POST",
            url: `${API_URL}/`,
            data: {userData},
        }).then((response) => {
            return response;
        });
        return dispatch({ type: ADD_USER, payload:  user.data});
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}
export const updateUserData = (userData) => async (dispatch) => {
    try {
        const user = await await axios({
            method: "PUT",
            url: `${API_URL}/user/update`,
            data: {userData},
        }).then((response) => {
            return response;
        });
        window.location.reload(false);
        return dispatch({ type: UPDATE_USER, payload: user.data });
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const deleteUser = (_id) => async (dispatch) => {
    try {
        const deleteUser = await axios({
            method: "DELETE",
            url: `${API_URL}/user/delete/${_id}`,
        }).then((response) => {
            return response;
        });
        window.location.reload(false);
        return dispatch({ type: DELETE_USER });
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}


export const getMySelf = () => async (dispatch) => {
    try {
        const User = await axios({
            method: "GET",
            url: `${API_URL}/user/`
        }).then((response) => {
            return response;
        });        
        return dispatch({ type: SELF, payload: User.data });
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const clearUser = () => async (dispatch) => {
    try {
      return dispatch({ type: CLEAR_USER, payload: {} });
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
      return dispatch({ type: "ERROR", payload: error });
    }
  };