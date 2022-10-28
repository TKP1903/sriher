import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader"
import { API_URL } from "../../key";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
//Redux action
import {
  eventRegisteration,
  createPayment,
  getUserEvent,
} from "../../Redux/Reducer/Events/event.action";

const OnGoingEvents = () => {
  const [eventData, setEventsData] = useState([]);
  const [eventNameForPay, setEventNameForPay] = useState("evet_name");
  const [online, setOnline] = useState(false);
  const [offline, setOffline] = useState(false);
  const [international, setInternational] = useState(false);
  const [events, setEvents] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [successMsg, setSuccessMsg] = useState({
    show: false,
    hide: true,
    message: "Hi",
  });

  const navigate = useNavigate();

  const reduxState = useSelector((globalStore) => globalStore.event);
  const userState = useSelector((globalStore) => globalStore.user.user);

  useEffect(() => {
    reduxState?.events && setEventsData(reduxState.events?.events);
    reduxState?.userEvents && setEvents(reduxState.userEvents.userEvents);
  }, [reduxState?.events]);

  const dispatch = useDispatch();
  const current_year = new Date();
  const initPayment = async (data) => {
    const rzkey = axios.get(`${API_URL}/payment/getRZPKEY`);
    let des_name = eventNameForPay + "-" + current_year.getFullYear();
    const options = {
      key: rzkey,
      amount: data.amount,
      currency: "INR",
      name: "ORALPATH",
      description: des_name,
      image: "https://oralpath.sriher.com/resources/assets/images/fav.png",
      order_id: data.id,
      // callback_url: `${API_URL}/payment/verify`,
      prefill: {
        name: userState.user?.fullName,
        email: userState.user?.email,
      },
      handler: async (response) => {
        try {
          const userID = userState?.user?._id;
          const verifyUrl = `${API_URL}/payment/verify/${userID}`;
          const { data } = await axios.post(verifyUrl, response);
          if (data) {
            setPaymentStatus(true);
          }
        } catch (error) {}
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    const cpay = rzp1.open();
  };
  const handlePayment = async (fee) => {
    try {
      const orderUrl = `${API_URL}/payment/orders`;
      const { data } = await axios.post(orderUrl, { amount: fee });
      const da = data.data;
      await initPayment(data.data);
    } catch (error) {
      return false;
    }
  };
  const eventRegister = async ({ data }) => {
    const eventRegData = {
      event_id: data._id,
      user_id: userState?.user?._id,
      user_name: userState?.user?.fullName,
      eventName: data.eventName,
      eventCostType: "Free",
      paymentStatus: false,
      registrationDate: Date.now(),
      user_email: userState?.user?.email,
      user_phonenumber: userState?.user?.phoneNumber,
      user_institution: userState?.user?.institution,
      user_State: userState?.user?.state,
      venue: data.venues,
      event_start_data: data.conferenceStartDate,
      event_end_data: data.conferenceEndDate,
      event_link: data.conferenceURL,
      amount_paid: 0,
      event_reg_type: "",
    };
    setEventNameForPay(data.eventName);

    var amount = 0;
    if (online === true) {
      amount = data.onlineprice;
      eventRegData.event_reg_type = "Online";
    }
    if (offline === true) {
      amount = data.offlineprice;
      eventRegData.event_reg_type = "Offline";
    }
    if (international === true) {
      amount = data.internationalprice;
      eventRegData.event_reg_type = "International";
    }

    const userId = userState?.user?._id;
    if (localStorage.SRCUser) {
      const checkuserEvents = await axios.get(
        `${API_URL}/payment/checkUserEventReg/${userId}`
      );
      const checkUserEventsData = checkuserEvents?.data?.data;

      if (data.conferenceType === "free") {
        dispatch(eventRegisteration(eventRegData));
      } else {
        if (checkuserEvents?.data?.data[0]?.paymentStatus === true) {
          alert(
            `You have already registered for the event ${checkuserEvents?.data?.data[0].eventName}`
          );
        } else if (checkuserEvents?.data?.data[0]?.paymentStatus === false) {
          await handlePayment(parseInt(amount), eventRegData, amount);
        } else {
          eventRegData.paymentStatus = false;
          eventRegData.amount = amount;
          eventRegData.eventCostType = "Paid";
          dispatch(eventRegisteration(eventRegData));
          await handlePayment(parseInt(amount));
        }
      }
    } else {
      alert("Please login to register for the event");
      navigate("/login");
    }
  };
  const createAlertMsg = async () => {
    const eventName = eventData[0]?.eventName;
    events?.map((data) => {
      if (data.paymentStatus === false) {
        if (data.eventName === eventName) {
          setSuccessMsg({
            show: true,
            hide: false,
            message: `Dear ${userState?.user?.fullName} please complete your payment for ${eventName} `,
          });
        }
      }
    });
  };
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    dispatch(getUserEvent(user_id));
    reduxState?.userEvents && setEvents(reduxState.userEvents.userEvents);
    createAlertMsg();
  }, []);
  const closeSuccess = () => {
    setSuccessMsg({
      show: false,
      hide: true,
      message: "",
    });
  };

  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold mt-3 text-center p-2 w-full bg-gray-100 lg:mx-44">
        OnGoing Events
      </h1>
      <div className="w-full lg:flex lg:items-center lg:justify-center pb-2">
        {successMsg?.show && (
          <div className="flex w-full lg:w-2/3 items-center justify-between bg-green-500 p-2 text-gray-50 font-semibold">
            {successMsg.message}
            <button onClick={closeSuccess}>
              <AiOutlineClose className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-10">
        {eventData?.length > 0 ? (
          eventData?.map(
            (data) =>
              data.status === "active" &&
              data.eventType === "conference" && (
                <div
                  key={data.eventName}
                  className="flex flex-col items-center justify-center gap-5 lg:gap-2 px-5 lg:px-10 bg-gray-100 lg:w-3/4 py-5 rounded-md shadow-2xl border"
                >
                  <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="w-full md:w-64 h-52 lg:w-2/3 lg:h-72">
                      <img
                        src={`${data.image}`}
                        alt="Loading"
                        className="w-full h-full rounded-sm"
                      />
                    </div>
                    <div className="md:w-1/2 flex flex-col gap-2">
                      <div className="flex items-center md:items-start gap-3">
                        {/* <h4 className="text-lg font-semibold w-1/4">
                          Speakers:
                        </h4>
                        <p className="text-sm lg:text-lg font-light text-gray-800 w-full">
                          {data.speaker}
                        </p> */}
                        {/* <a
                          href="https://drive.google.com/file/d/1Deyb6NMYHQoiOa_xhdqUZ1vnAVsZ-KhO/view?usp=sharing"
                          download
                          className="text-red-500 font-semibold"
                        >
                          Download Broucher
                        </a> */}
                        <a
                          href={`${data.broucherLink}`}
                          target="_blank"
                          className="text-lg font-light px-2 py-1 bg-red-600 font-bold text-gray-50 rounded-lg"
                        >
                          View brochure
                        </a>
                      </div>
                      <div className="flex items-center md:items-start gap-3">
                        <h4 className="text-lg font-semibold w-1/4">
                          Eligibility
                        </h4>
                        <p className="text-sm lg:text-lg font-light text-gray-800 w-full">
                          {data.eligibility.join(" , ")}
                        </p>
                      </div>
                      {/* <div className="flex items-start gap-3">
                    <p className="text-sm lg:text-lg font-light text-gray-800">{data.conferenceStartDate}  to </p>
                    <p className="text-sm lg:text-lg font-light text-gray-800">{data.conferenceEndDate}</p>
                  </div>   */}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 items-center justify-between w-full">
                    <div className="w-full flex flex-col gap-2 md:w-2/3">
                      <h2 className="text-xl font-bold">
                        {data.eventName?.toUpperCase()}
                      </h2>
                      <p className="text-sm lg:text-lg font-light text-gray-800">
                        {data.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 md:w-2/6">
                      <h4 className="text-lg font-semibold">
                        Venue : {data.venues}
                      </h4>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              setOnline(e.target.checked);
                            }}
                          />
                          <h4 className="text-lg font-semibold">
                            Online Price :
                            <span className="text-green-700">
                              {data.onlineprice ? data.onlineprice : 0}
                            </span>
                          </h4>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              setOffline(e.target.checked);
                            }}
                          />
                          <h4 className="text-lg font-semibold">
                            Offline Price :
                            <span className="text-green-700">
                              {data.offlineprice ? data.offlineprice : 0}
                            </span>
                          </h4>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              setInternational(e.target.checked);
                            }}
                          />
                          <h4 className="text-lg font-semibold">
                            International :
                            <span className="text-green-700">
                              {data.internationalprice
                                ? data.internationalprice
                                : 0}
                            </span>
                          </h4>
                        </div>
                      </div>
                      <button
                        className="bg-green-600 hover:bg-blue-700 text-gray-50 text-lg font-bold w-full md:w-auto px-4 py-1 mt-2 rounded-lg"
                        onClick={() => {
                          if (
                            (online === true &&
                              offline === false &&
                              international === false) ||
                            (online === false &&
                              offline === true &&
                              international === false) ||
                            (online === false &&
                              offline === false &&
                              international === true)
                          ) {
                            eventRegister({ data });
                          } else {
                            alert(
                              "Please select any one from online or offline or international"
                            );
                          }
                          // payNow({ data });
                          // handlePayment
                        }}
                      >
                        Pay to Register
                      </button>
                    </div>
                  </div>
                </div>
              )
          )
        ) : (
          <div className="w-full h-screen flex items-center justify-center">
            <MoonLoader width={1000} height={1000} />
          </div>
        )}
      </div>
    </>
  );
};

export default OnGoingEvents;
// {
//   "_id": "629f94cea52f728051002a1d",
//   "eventName": "demoEvent",
//   "subHeading": "sub",
//   "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, nesciunt pariatur fugiat quo doloribus reprehenderit labore architecto repellendus dolores consectetur ullam, deserunt iure laborum facere, perferendis dolorem voluptas commodi! Veritatis.",
//   "specialNotes": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, nesciunt pariatur fugiat quo doloribus reprehenderit labore architecto repellendus dolores consectetur ullam, deserunt iure laborum facere, perferendis dolorem voluptas commodi! Veritatis.",
//   "speaker": [
//       "DR.RAGHU DHANAPAL",
//       "DR.SHREENIVAS, S. VANAKI",
//       "DR.ABIKSHYEET PANDA "
//   ],
//   "organiser": [
//       "Dr.H.Thamizhchelvan",
//       "Dr.N.Malathi"
//   ],
//   "eligibility": [
//       "Postgraduates",
//       "Faculty",
//       "International"
//   ],
//   "status": "active",
//   "currentHome": "yes",
//   "abstractForm": "yes",
//   "registerDate": "2022-06-08T18:30:00.000Z",
//   "conferenceStartDate": "2022-06-06T18:30:00.000Z",
//   "conferenceEndDate": "2022-06-09T18:30:00.000Z",
//   "image": "https://oralpath.sriher.com//resources/pcadmin/img/gallery/1103513440_WhatsApp%20Image%202021-02-25%20at%202.07.11%20PM.jpeg",
//   "venues": "online",
//   "conferenceType": "free",
//   "conferenceURL": "www.zoom.dkgbj36984y.com",
//   "scheduleConference": [],
//   "__v": 0
// }
