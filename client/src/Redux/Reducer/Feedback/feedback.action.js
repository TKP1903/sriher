import axios from "axios";

//Redux types
import { GET_FEEDBACK, ADD_FEEDBACK, DELETE_FEEDBACK, ADD_FACULTY_FEEDBACK, UPDATE_FACULTY_FEEDBACK, GET_SPECIFIC_FEEDBACK, GET_FACULTY_FEEDBACK } from "./feedback.type";

import { API_URL } from "../../../key";
import { setError } from "../Errors/error.type";

export const getFeedback = () => async (dispatch) => {
  try {
    const feedbackList = await axios({
      method: "GET",
      url: `${API_URL}/feedback/getfacultyfeedbackdata`,
    }).then((response) => {
      return response;
    });
    return dispatch({ type: GET_FEEDBACK, payload: feedbackList.data });
  } catch (error) {
    if (error.response.status === 500) {
      alert(error.response.data.error);
    }
    return dispatch({ type: "ERROR", payload: error });
  }
};
export const getFacultyFeedback = (_id) => async (dispatch) => {
  try {
    console.log("_ID" + _id);
    const facultyFeedbackList = await axios({
      method: "GET",
      url: `${API_URL}/feedback/faculty-feedback/${_id}`,
    }).then((response) => {
      return response;
    });
    return dispatch({
      type: GET_FACULTY_FEEDBACK,
      payload: facultyFeedbackList.data,
    });
  } catch (error) {
    if (error.response.status === 500) {
      alert(error.response.data.error);
    }
    return dispatch({ type: "ERROR", payload: error });
  }
};
export const getSpecificFeedback = (_id) => async (dispatch) => {
  try {
    console.log("_ID" + _id);
    const specificFacultyList = await axios({
      method: "GET",
      url: `${API_URL}/feedback/get-ffaculty/${_id}`,
    }).then((response) => {
      return response;
    });
    return dispatch({
      type: GET_SPECIFIC_FEEDBACK,
      payload: specificFacultyList.data,
    });
  } catch (error) {
    if (error.response.status === 500) {
      alert(error.response.data.error);
    }
    return dispatch({ type: "ERROR", payload: error });
  }
};
//for adding the user Feedback
export const addUserFeedback = (feedbackData) => async (dispatch) => {
  try {
    console.log(feedbackData);
    const feedback = await axios({
      method: "POST",
      url: `${API_URL}/feedback/add-user-feedback`,
      data: { feedbackData },
    }).then((response) => {
      return response;
    });
    window.location.href = `/certificate`;
    // window.location.reload(false);
    return dispatch({ type: ADD_FEEDBACK, payload: feedback.data });
  } catch (error) {
    if (error.response.status === 500) {
      // alert(error.response.data.error);
      setError(error);
    }
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const addFacultyForFeedback = (facultyData) => async (dispatch) => {
    try {
        const facultydata = await axios({
            method: "POST",
            url: `${API_URL}/feedback/add-faculty-for-feedback`,
            data: {facultyData},
        }).then((response) => {
            return response;
        });

        return dispatch({ type: ADD_FACULTY_FEEDBACK, payload:  facultydata.data});
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }       
        return dispatch({ type: "ERROR", payload: error });
    }
}


export const updateFeedbacFacultyData = (facultyData) => async (dispatch) => {
    try {
        const faculty = await axios({
            method: "PUT",
            url: `${API_URL}/feedback/update-feedack-faculty`,
            data: {facultyData},
        }).then((response) => {
            return response;
        });
        return dispatch({ type: UPDATE_FACULTY_FEEDBACK, payload:  facultyData.data});
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const deleteFacultyFeedback = (_id) => async (dispatch) => {
    try {
        const deleteFac = await axios({
            method: "DELETE",
            url: `${API_URL}/feedback/delete-faculty-feedback/${_id}`,
        }).then((response) => {
            return response;
        });
        if(!deleteFac.status === 200) {
            alert("Error")
        }        
        window.location.reload(false);
        return dispatch({ type: DELETE_FEEDBACK, payload:  deleteFac.data});
    } catch (error) {
        if(error.response.status === 500) {
            alert(error.response.data.error);
        }
        return dispatch({ type: "ERROR", payload: error });
    }
}