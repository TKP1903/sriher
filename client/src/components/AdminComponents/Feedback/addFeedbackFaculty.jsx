import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

//Redux actions
import { addFacultyForFeedback } from '../../../Redux/Reducer/Feedback/feedback.action'; 
const AddFeedbackFaculty = () => {
    const [feedbackFormData, setFeedbackFormData] = useState([
      {
        name: "",
        image: "",
        feedback_status: "",
        faculty1: "",
        faculty2: "",
        faculty3: "",
        faculty4: "",
      },
    ]);

    console.log(feedbackFormData);

    const dispatch = useDispatch();
    const submit = () => {
      dispatch(
        addFacultyForFeedback({
          ...feedbackFormData,
        })
      );
      setFeedbackFormData({
        name: "",
        degree: "",
        position: "",
        image: "",
        feedback_status: "",
        faculty1: "",
        faculty2: "",
        faculty3: "",
        faculty4: "",
      });
    };

    return (
      <>
        <div className="flex flex-col items-end gap-10 bg-white px-4 py-5 border shadow-xl rounded-md">
          <div className="flex flex-wrap gap-5">
            <TextField
              required
              id="outlined-required"
              label="Event Name"
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
              label="Image url"
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
                label="faculty 1"
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
                label="faculty 2"
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
                label="faculty 3"
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
                label="faculty 4"
                onChange={(e) =>
                  setFeedbackFormData((prev) => ({
                    ...prev,
                    faculty4: e.target.value,
                  }))
                }
              />
            </div>
            <TextField
              id="feedback_status"
              select
              label="Select"
              onChange={(e) =>
                setFeedbackFormData((prev) => ({
                  ...prev,
                  feedback_status: e.target.value,
                }))
              }
              value={feedbackFormData.feedback_status}
              helperText="Select the feedback_status of the student"
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
              Submit
            </Link>
          </div>
        </div>
      </>
    );
}

export default AddFeedbackFaculty;