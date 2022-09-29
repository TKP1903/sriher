import axios from "axios";

//Redux types
import { GET_EVENTS, ADD_EVENT, GET_SPECIFIC_EVENT, DELETE_EVENT, UPDATE_EVENT, GET_ALL_REGISTERED_EVENTS, GET_USER_EVENTS, REGISTER_EVENT, CREATE_PAYMENT } from "./event.type";

import { API_URL } from "../../../key";

export const getEvents = () => async (dispatch) => {
    try {
        const eventList = await axios({
            method: "GET",
            url: `${API_URL}/events`,
        }).then((response) => {
            return response;
        });        
        return dispatch({ type: GET_EVENTS, payload: eventList.data });
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const getSpecificEvent = (_id) => async (dispatch) => {
    try {
        const specificEventList = await axios({
            method: "GET",
            url: `${API_URL}/events/get/${_id}`
        }).then((response) => {
            return response;
        });
        return dispatch({ type: GET_SPECIFIC_EVENT, payload: specificEventList.data });
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const addEvent = (eventData) => async (dispatch) => {
    try {
        const event = await axios({
            method: "POST",
            url: `${API_URL}/events/add-event`,
            data: {eventData},
        }).then((response) => {
            return response;
        });
        return dispatch({ type: ADD_EVENT, payload:  event.data});
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const updateEventData = (eventData) => async (dispatch) => {
    try {
        const event = await axios({
            method: "PUT",
            url: `${API_URL}/events/update-event`,
            data: {eventData},
        }).then((response) => {
            return response;
        });
        return dispatch({ type: UPDATE_EVENT, payload:  event.data});
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const deleteEvent = (_id) => async (dispatch) => {
    try {
        const deleteEvent = await axios({
            method: "DELETE",
            url: `${API_URL}/events/delete/${_id}`,
        }).then((response) => {
            return response;
        });        
        window.location.reload(false);
        return dispatch({ type: DELETE_EVENT, payload: deleteEvent.data});
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}


export const getAllRegistredEvents = (_id) => async (dispatch) => {
    try {
        const registredEventsList = await axios({
            method: "GET",
            url: `${API_URL}/events/get-registered-events/${_id}`
        }).then((response) => {
            return response;
        });        
        return dispatch({ type: GET_ALL_REGISTERED_EVENTS, payload: registredEventsList.data });
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const getUserEvent = (_id) => async (dispatch) => {
    try {
        console.log(_id);
        const userEventList = await axios({
            method: "GET",
            url: `${API_URL}/events/getuserevents/${_id}`
        }).then((response) => {
            return response;
        });
        return dispatch({ type: GET_USER_EVENTS, payload: userEventList.data });
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const eventRegisteration = (eventRegData) => async (dispatch) => {
    try {
        const event = await axios({
            method: "POST",
            url: `${API_URL}/events/event-register-user`,
            data: {eventRegData},
        }).then((response) => {
            return response;
        });
        if (event.status === 200) {
          alert("Registration successfull");
        }
        return dispatch({ type: REGISTER_EVENT, payload:  event.data});
    } catch (error) {
        if(error.response.status === 500) {
          // alert(error.response.data.error);
          // window.location.href = "/events";
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const createPayment = () => async (dispatch) => {
    try {
        const order = await axios({
          method: "GET",
          url: `${API_URL}/payment/order`,
        }).then((response) => {
          return response;
        });
        return dispatch({ type: CREATE_PAYMENT, payload:  order.data});
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}
