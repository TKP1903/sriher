import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserFeedback,
  getFeedback,
} from "../../Redux/Reducer/Feedback/feedback.action";

const FeedbackhtmlForm = () => {
  const [faculty, setFaculty] = useState([
    {
      faculty_id: "",
    },
  ]);
  const [user, setuser] = useState();
  const [feedbackData, setFeedbackData] = useState([]);
  const dispatch = useDispatch();

  const reduxState = useSelector((globalStore) => globalStore.Feedback);
  const userState = useSelector((userStore) => userStore.user);
  useEffect(() => {
    reduxState?.feedback && setFaculty(reduxState.feedback.feedbackData);
    userState?.user && setuser(userState.user?.user);
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
  };

  //console.log(feedbackData);
  const submit = () => {
    console.log({ feedbackData });
    dispatch(addUserFeedback(feedbackData));
    //const data = feedbackData;

    // const res = await axios.post("http://localhost:4000/feedback/add-feedback", data);
    // if(res.status === 200) {
    //     alert("Feedback successfully submitted");
    // }else{
    //     alert("Please submit your Feedback again!!");
    // }
  };

  const send = (_id) => {
    //setFeedbackData((prev) => ({ ...prev, faculty_id: _id }))
    //submit();
  };
  return (
    <div className="flex flex-col items-center justify-center md:mx-10 lg:mx-44">
      <div className="flex flex-row items-center justify-between pb-8 w-full">
        <h1 className="text-center bg-gray-100 py-1 w-full text-2xl md:font-3xl font-semibold md:font-bold pl-3">
          Feedback Form
        </h1>
      </div>
      {faculty?.length > 0 ? (
        faculty?.map(
          (row) =>
            row.feedback_status === "Active" && (
              <div className="flex flex-col md:flex-row-reverse items-center w-full md:items-start justify-around bg-cyan-900 py-6 border border-gray-200 shadow lg:mx-44 rounded-lg">
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
                <div className="flex flex-col items-center justify-center pl-4 gap-6">
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
                      <option value="Calls to college">Calls to college</option>
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
  );
};

export default FeedbackhtmlForm;
