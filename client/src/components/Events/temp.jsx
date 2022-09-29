import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader"
import { API_URL } from "../../key";
import axios from "axios";
import { Link } from "react-router-dom";
//Redux action
import {
  eventRegisteration,
  createPayment,
} from "../../Redux/Reducer/Events/event.action";

const OnGoingEvents = () => {
  const [eventData, setEventsData] = useState([]);
  const [online, setOnline] = useState(false);
  const [offline, setOffline] = useState(false);
  const [international, setInternational] = useState(false);
  const navigate = useNavigate();
  const reduxState = useSelector((globalStore) => globalStore.event);
  const userState = useSelector((globalStore) => globalStore.user.user);
  useEffect(() => {
    reduxState?.events && setEventsData(reduxState.events?.events);
  }, [reduxState?.events]);
  console.log({ online, offline, international });

  const dispatch = useDispatch();
  // const payNow = async ({ event_Data }) => {
  //   try {
  //     // const payments = dispatch(createPayment(200));
  //     const payments = await axios.get(`${API_URL}/payment/order`);
  //     console.log(payments);
  //     const { data } = payments;
  //     const options = {
  //       key: "rzp_live_gN88e4C0ndRhfx", // Enter the Key ID generated from the Dashboard
  //       // amount: "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //       currency: "INR",
  //       name: "oralpath",
  //       description: "Event Payment",
  //       image: "https://example.com/your_logo",
  //       order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //       handler: async (response) => {
  //         try {
  //           alert("HANDLER");
  //           console.log({ response });
  //           const paymentId = response.razorpay_payment_id;
  //           console.log({ paymentId });
  //           const url = `${API_URL}/payment/capture/${paymentId}`;
  //           const captureResponse = await axios.post(url, {});
  //           console.log(captureResponse.data);
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       },
  //       prefill: {
  //         name: "Gaurav Kumar",
  //         email: "gaurav.kumar@example.com",
  //         contact: "9090909090",
  //       },
  //       notes: {
  //         address: "Razorpay Corporate Office",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };
  //     console.log("PAYMENT  STARTING");
  //     const razorpay = new window.Razorpay(options);
  //     console.log("PAYMENT  STARTED");
  //     razorpay.open();
  //     console.log("PAYMENT  COMPLETED");
  //     // eventRegister({ event_Data });
  //     // e.preventDefault();
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error.message);
  //     alert(error);
  //   }
  // };
  const launchRazorpyay = async () => {
    let options = {
      key: "rzp_test_f7AzNO9BLJVfUI",
      amount: 500 * 100,
      currency: "INR",
      name: "Sri Ramachandra",
      description: "Payment for the event registration",
      image: "https://oralpath.sriher.com/resources/assets/images/fav.png",
      handler: () => {
        alert("payment Completed");
      },
      prefill: {
        name: userState.user?.fullName,
        email: userState.user?.email,
      },
      theme: { color: "#c4242d" },
    };
    let razorPay = new window.Razorpay(options);
    const rp = razorPay.open();
    return rp;
  };
  const initPayment = async (data) => {
    console.log(data);
    const rzkey = axios.get(`${API_URL}/payment/getRZPKEY`);
    const options = {
      key: rzkey,
      amount: data.amount,
      currency: "INR",
      name: "ORALPATH",
      description: "Test Transaction",
      image: "",
      order_id: data.id,
      // callback_url: `${API_URL}/payment/verify`,
      handler: async (response) => {
        try {
          const verifyUrl = `${API_URL}/payment/verify`;
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const handlePayment = async () => {
    try {
      const orderUrl = `${API_URL}/payment/orders`;
      const { data } = await axios.post(orderUrl, { amount: 1 });
      console.log(data);
      await initPayment(data.data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  console.log(eventData);
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
    };
    alert("A");
    if (
      (online === true && offline === false && international === false) ||
      (online === false && offline === true && international === false) ||
      (online === false && offline === false && international === true)
    ) {
      if (localStorage.SRCUser) {
        if (data.conferenceType === "free") {
          // dispatch(eventRegisteration(eventRegData));
        } else {
          const pay = await handlePayment();
          if (pay === true) {
            eventRegData.paymentStatus = true;
            dispatch(eventRegisteration(eventRegData));
          } else {
            alert("Cant register, please contact administrator");
          }
        }
      } else {
        alert("Please login to register for the event");
        navigate("/login");
      }
    } else {
      alert("Please select only online or offline or international");
    }
  };

  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold mt-3 text-center p-2 w-full bg-gray-100 lg:mx-44">
        OnGoing Events
      </h1>
      <div className="flex flex-col items-center justify-center gap-10">
        {eventData?.length > 0 ? (
          eventData?.map(
            (data) =>
              data.status === "active" &&
              data.eventType === "conference" && (
                <div className="flex flex-col items-center justify-center gap-5 lg:gap-2 px-5 lg:px-10 bg-gray-100 lg:w-3/4 py-5 rounded-md shadow-2xl border">
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
                        <Link to="/broucher">View Broucher</Link>
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
                        className="bg-green-600 text-gray-50 text-xl font-bold w-full md:w-auto px-4 py-1 mt-2 rounded-lg"
                        onClick={() => {
                          eventRegister({ data });
                          // payNow({ data });
                          // handlePayment
                        }}
                      >
                        Register
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
