import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUserFeedback,
  getFeedback,
} from "../../Redux/Reducer/Feedback/feedback.action";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

import { getMySelf } from "../../Redux/Reducer/User/user.action";
import { API_URL } from "../../key";

const FeedbackhtmlForm = () => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const [faculty, setFaculty] = useState([
    {
      faculty_id: "",
      user_id: "",
    },
  ]);
  const [errorMsg, setErrorMsg] = useState({
    show: false,
    message: "",
  });
  const [user, setuser] = useState();
  const [feedbackData, setFeedbackData] = useState([]);
  const dispatch = useDispatch();

  const reduxState = useSelector((globalStore) => globalStore.Feedback);
  const userState = useSelector((userStore) => userStore.user);

  useEffect(() => {
    reduxState?.feedback && setFaculty(reduxState.feedback.feedbackData);
    userState?.user && setuser(userState.user?.user);
    reduxState?.error &&
      setErrorMsg({
        show: true,
        message: reduxState?.error?.response?.data?.error,
      });
  }, [reduxState]);
  useEffect(() => {
    dispatch(getFeedback());
  }, []);
  const handleChange = (event) => {
    const value = event.target.value;
    setFeedbackData({
      ...feedbackData,
      [event.target.name]: value,
    });
    // setFeedbackData({
    //   ...feedbackData,
    //   user_id: user._id,
    // });
  };

  const submit = async () => {
    try {
      dispatch(getMySelf());
      const getUseID = userState.user?.user?._id;
      setFeedbackData({
        ...feedbackData,
        user_id: getUseID ? getUseID : user_id,
      });

      localStorage.setItem("cert_name", feedbackData.name);
      if (
        feedbackData.feedback_event_id &&
        feedbackData.user_id &&
        feedbackData.name
      ) {
        const feedback = await axios({
          method: "POST",
          url: `${API_URL}/feedback/add-user-feedback`,
          data: { feedbackData },
        }).then((response) => {
          return response;
        });
        navigate("/certificate");
        // dispatch(addUserFeedback(feedbackData));
        // console.log(reduxState?.error?.response?.data?.error);
        // alert(reduxState?.error?.response?.data?.error);
        // if (reduxState?.error?.response) {
        //   alert("eI");
        //   setErrorMsg({
        //     show: true,
        //     message: reduxState?.error.response?.data?.error,
        //   });
        // }
      } else {
        // alert("Cant submit your feedback");
        setErrorMsg({
          show: true,
          message: "Please fill all the fields",
        });
      }

      // let feedback_event_id;
      // faculty?.map((row) => {
      //   if (row.feedback_status === "Active") {
      //     feedback_event_id = row._id;
      //   }
      // });
      // const result = await axios.post(
      //   `${API_URL}/feedback/check-user-feedback`,
      //   {
      //     user_id: localStorage.getItem("user_id"),
      //     feedback_event_id,
      //   }
      // );
      // const data_user_feedback = result?.data?.check_feedback.length;

      // if (data_user_feedback > 0) {
      //   alert("You have already submitted the feedback");
      // } else {
      //   dispatch(addUserFeedback(feedbackData));
      //   navigate(`/certificate`);
      // }
    } catch (error) {
      console.log(error?.response.data.error);
      console.log(error.message);
      setErrorMsg({
        show: true,
        message: error?.response.data.error,
      });
    }
  };

  const closeError = () => {
    setErrorMsg({
      show: false,
      message: "",
    });
  };
  return (
    <>
      <div className="flex items-end justify-end w-full  pb-5">
        {errorMsg?.show && (
          <div className="flex fixed top-20 lg:top-32 w-auto items-center justify-between gap-10 bg-red-500 p-2 text-white font-light">
            {errorMsg.message}
            <button onClick={closeError}>
              <AiOutlineClose />
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center md:mx-10 lg:mx-44">
        <div className="pb-8 w-full">
          <h1 className="text-center bg-gray-100 py-1 w-full text-2xl md:font-3xl font-semibold md:font-bold pl-3">
            Feedback Form
          </h1>
        </div>
        {faculty?.length > 0 ? (
          faculty?.map(
            (row) =>
              row.feedback_status === "Active" && (
                <div
                  key={row._id}
                  className="flex flex-col md:flex-row-reverse items-center w-full md:items-start gap-9 justify-around bg-cyan-900 py-6 border border-gray-200 shadow lg:mx-44 rounded-lg"
                >
                  <div className="mx-6 md:mx-1 md:w-1/2">
                    <div className="w-full md:px-10 lg:px-20">
                      <img
                        src={row.image}
                        alt=""
                        className="w-full shadow-lg rounded-md"
                      />
                    </div>
                    <div className="text-center text-gray-50">
                      <h3 className="text-lg font-bold">{row.name}</h3>
                      <p className="text-sm font-light">{row.position}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-center pl-4 gap-6">
                    <div className="flex flex-col items-start gap-2">
                      <label
                        className="block text-gray-50 text-sm font-bold mb-2"
                        htmlFor="username"
                      >
                        Name of the student / Faculty
                      </label>
                      <input
                        className="appearance-none border border-gray-400 shadow rounded w-full py-2 px-3 w-80 md:w-96 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="name"
                        type="text"
                        placeholder="Username"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label
                        className="block text-gray-50 text-sm font-bold mb-2"
                        htmlFor="username"
                      >
                        Email
                      </label>
                      <input
                        className="appearance-none border border-gray-400 shadow rounded w-full py-2 px-3 w-80 md:w-96 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="email"
                        type="email"
                        placeholder="email"
                        //onChange={handleChange}
                        onChange={(e) =>
                          setFeedbackData((prev) => ({
                            ...prev,
                            email: e.target.value,
                            feedback_event_id: row._id,
                          }))
                        }
                        required
                      />
                    </div>
                    <div>
                      <h4 className="block text-gray-50 text-sm font-bold mb-2 text-start ">
                        How did you come to know about this program?
                      </h4>
                      <select
                        name="path_to_event"
                        value={feedbackData.usefulTopic}
                        onChange={handleChange}
                        className="w-72 md:w-96 py-1 border border-gray-400 shadow focus:outline-none focus:shadow-outline"
                      >
                        <option value="disable"></option>
                        <option value="Email correspondence">
                          Email correspondence
                        </option>
                        <option value="Calls to college">
                          Calls to college
                        </option>
                        <option value="Social Media">Social Media</option>
                        <option value="Through Friends or colleagues">
                          Through Friends or colleagues
                        </option>
                        <option value="Any other">Any other</option>
                      </select>
                    </div>
                    {row.faculty1 && (
                      <div className="flex flex-col items-start">
                        <label
                          className="block text-gray-50 text-sm font-bold"
                          htmlFor="username"
                        >
                          Scale Rate – {row.faculty1}
                        </label>
                        <ReactStars
                          count={5}
                          size={42}
                          name="rating"
                          onChange={(e) =>
                            setFeedbackData((prev) => ({
                              ...prev,
                              faculty1_rating: e,
                            }))
                          }
                          activeColor="#ffd700"
                        />
                      </div>
                    )}
                    {row.faculty2 && (
                      <div className="flex flex-col items-start">
                        <label
                          className="block text-gray-50 text-sm font-bold"
                          htmlFor="username"
                        >
                          Scale Rate – {row.faculty2}
                        </label>
                        <ReactStars
                          count={5}
                          size={42}
                          name="rating"
                          onChange={(e) =>
                            setFeedbackData((prev) => ({
                              ...prev,
                              faculty2_rating: e,
                            }))
                          }
                          activeColor="#ffd700"
                        />
                      </div>
                    )}
                    {row.faculty3 && (
                      <div className="flex flex-col items-start">
                        <label
                          className="block text-gray-50 text-sm font-bold"
                          htmlFor="username"
                        >
                          Scale Rate – {row.faculty3}
                        </label>
                        <ReactStars
                          count={5}
                          size={42}
                          name="rating"
                          onChange={(e) =>
                            setFeedbackData((prev) => ({
                              ...prev,
                              faculty3_rating: e,
                            }))
                          }
                          activeColor="#ffd700"
                        />
                      </div>
                    )}
                    {row.faculty4 && (
                      <div className="flex flex-col items-start">
                        <label
                          className="block text-gray-50 text-sm font-bold"
                          htmlFor="username"
                        >
                          Scale Rate – {row.faculty4}
                        </label>
                        <ReactStars
                          count={5}
                          size={42}
                          name="rating"
                          onChange={(e) =>
                            setFeedbackData((prev) => ({
                              ...prev,
                              faculty4_rating: e,
                            }))
                          }
                          activeColor="#ffd700"
                        />
                      </div>
                    )}

                    <div className="flex flex-col items-start">
                      <label
                        className="block text-gray-50 text-sm font-bold"
                        htmlFor="username"
                      >
                        Scale Rate- Overall {row.name}
                        {/* How would you rate this program ? */}
                      </label>
                      <ReactStars
                        count={5}
                        size={42}
                        name="event"
                        onChange={(e) =>
                          setFeedbackData((prev) => ({
                            ...prev,
                            event_rating: e,
                          }))
                        }
                        activeColor="#ffd700"
                      />
                    </div>

                    <div className="flex flex-col items-start gap-2">
                      <label
                        className="block text-gray-50 text-sm font-bold mb-2"
                        htmlFor=""
                      >
                        Any topics you think would be helpful for next Slide
                        seminars?
                      </label>
                      <textarea
                        name="suggested_topic"
                        onChange={handleChange}
                        className="appearance-none border border-gray-400 shadow rounded py-2 px-3 w-80 md:w-96 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      ></textarea>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label
                        className="block text-gray-50 text-sm font-bold mb-2"
                        htmlFor="feedback"
                      >
                        Any other Suggestions
                      </label>
                      <input
                        className="appearance-none border border-gray-400 shadow rounded py-2 px-3 w-80 md:w-96 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="suggestion"
                        id="feedback"
                        type="text"
                        placeholder=""
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <button
                        className="p-2 text-xl font-bold bg-green-600 rounded-lg w-80 md:w-96 text-gray-50"
                        name="faculty_id"
                        id="faculty_id"
                        //onChange={(e) => setEventData((prev) => ({...prev, currentHome: e.target.value}))}
                        onClick={() => {
                          submit();
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default FeedbackhtmlForm;
