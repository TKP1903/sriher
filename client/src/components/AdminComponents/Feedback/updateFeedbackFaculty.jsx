import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

//Redux action
import { updateFeedbacFacultyData, getSpecificFeedback } from '../../../Redux/Reducer/Feedback/feedback.action'; 

const UpdateFeedbackFaculty = () => {
    const { type } = useParams();
    const [feedbackFormData, setFeedbackFormData] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getSpecificFeedback(type));
    }, []);

    const reduxState = useSelector((globalStore) => globalStore.Feedback);
    useEffect(() => {
      reduxState?.feedback && setFeedbackFormData(reduxState?.feedback.faculty);
    }, [reduxState]);

    const submit = () => {
      dispatch(
        updateFeedbacFacultyData({
          ...feedbackFormData,
        })
      );
    };

    return (
      <>
        <div className="flex flex-col items-end gap-10 bg-white px-4 py-5 border shadow-xl rounded-md">
          <div className="flex flex-wrap gap-5">
            <TextField
              required
              className="w-1/2"
              id="outlined-required"
              helperText="Faculty name"
              value={feedbackFormData?.name}
              onChange={(e) =>
                setFeedbackFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <TextField
              required
              id="outlined-required"
              helperText="Image url"
              value={feedbackFormData?.image}
              onChange={(e) =>
                setFeedbackFormData((prev) => ({
                  ...prev,
                  image: e.target.value,
                }))
              }
              fullWidth
            />
            <div className="flex flex-wrap gap-5 items-center justify-between w-full">
              <TextField
                required
                id="outlined-required"
                helperText="faculty 1"
                value={feedbackFormData?.faculty1}
                onChange={(e) =>
                  setFeedbackFormData((prev) => ({
                    ...prev,
                    faculty1: e.target.value,
                  }))
                }
              />
              <TextField
                required
                id="outlined-required"
                helperText="faculty 2"
                value={feedbackFormData?.faculty2}
                onChange={(e) =>
                  setFeedbackFormData((prev) => ({
                    ...prev,
                    faculty2: e.target.value,
                  }))
                }
              />
              <TextField
                required
                id="outlined-required"
                helperText="faculty 3"
                value={feedbackFormData?.faculty3}
                onChange={(e) =>
                  setFeedbackFormData((prev) => ({
                    ...prev,
                    faculty3: e.target.value,
                  }))
                }
              />
              <TextField
                required
                id="outlined-required"
                helperText="faculty 4"
                value={feedbackFormData?.faculty4}
                onChange={(e) =>
                  setFeedbackFormData((prev) => ({
                    ...prev,
                    faculty4: e.target.value,
                  }))
                }
              />
            </div>
            <TextField
              className="w-64"
              id="status"
              select
              onChange={(e) =>
                setFeedbackFormData((prev) => ({
                  ...prev,
                  feedback_status: e.target.value,
                }))
              }
              value={feedbackFormData?.feedback_status}
              helperText={`${feedbackFormData?.feedback_status}`}
            >
              <MenuItem value={"Active"}>Active</MenuItem>
              <MenuItem value={"Inactive"}>InActive</MenuItem>
            </TextField>
          </div>
          <div className="flex flex-row items-center gap-5">
            <Link
              to="/admin/feedback"
              className="px-2 py-1 bg-rose-700 text-gray-50 rounded-md"
            >
              Cancel
            </Link>
            <Link
              to="/admin/feedback"
              onClick={submit}
              className="px-2 py-1 bg-green-900 text-gray-50 rounded-md"
            >
              Update
            </Link>
          </div>
        </div>
      </>
    );
}

export default UpdateFeedbackFaculty;
