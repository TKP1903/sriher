import axios from "axios";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

//Components
import NavBar from "../components/Navbar/NavBar";
import { API_URL } from "../key";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [otpScreen, setOtpScreen] = useState(false);
  const [changePasswordScreen, setChangePasswordScreen] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    show: false,
    hide: true,
    message: "",
  });
  const [successMsg, setSuccessMsg] = useState({
    show: false,
    hide: true,
    message: "",
  });
  const verifyEmailAndSendOtp = async () => {
    try {
      const verifyEmail = await axios.get(
        `${API_URL}/auth/verify-email/${email}`
      );
      setErrorMsg({
        show: false,
        hide: true,
        message: "",
      });

      setSuccessMsg({
        show: true,
        hide: false,
        message: "OTP sent Successfully",
      });

      if (verifyEmail?.status === 200) {
        setOtpScreen(true);
      }
    } catch (error) {
      setErrorMsg({
        show: true,
        hide: false,
        message: error?.response.data.error,
      });
    }
  };
  const verifyOTP = async () => {
    try {
      const checkOTP = await axios({
        method: "POST",
        url: `${API_URL}/auth/verify-otp`,
        data: {
          email,
          otp,
        },
      });
      if (checkOTP?.status === 200) {
        setOtpScreen(false);
        setChangePasswordScreen(true);
      }
    } catch (error) {
      setErrorMsg({
        show: true,
        hide: false,
        message: error?.response.data.error,
      });
    }
  };
  const validateAndChangePassword = async () => {
    var err = 0;
    if (password === " ") {
      err = 1;
      setErrorMsg({ show: true, hide: false, message: "Enter Your Password" });
    }
    if (confirmPassword === " ") {
      err = 1;
      setErrorMsg({
        show: true,
        hide: false,
        message: "Confirm Your Password",
      });
    }
    if (!(password === confirmPassword)) {
      err = 1;
      setErrorMsg({
        show: true,
        hide: false,
        message: "Password did not match",
      });
    }

    if (err === 0) {
      const userData = {
        email,
        password: password,
      };
      try {
        const changePassword = await axios({
          method: "POST",
          url: `${API_URL}/auth/change-password-by-email`,
          data: {
            email,
            password,
          },
        });
        if (changePassword?.status === 200) {
          setOtpScreen(false);
          setChangePasswordScreen(true);
          navigate("/login");
        }
      } catch (error) {
        setErrorMsg({
          show: true,
          hide: false,
          message: error?.response.data.error,
        });
      }
    }
  };
  const closeSuccess = () => {
    setSuccessMsg({
      show: false,
      hide: true,
      message: "",
    });
  };
  const closeError = () => {
    setErrorMsg({
      show: false,
      hide: true,
      message: "",
    });
  };
  return (
    <div>
      <NavBar />
      <div className="relative top-10 lg:top-20 py-10">
        <div className="w-full pt-44 flex flex-col items-center justify-center">
          {errorMsg?.show && (
            <div className="flex w-1/3 items-center justify-between bg-red-500 p-2 text-white font-light">
              {errorMsg.message}
              <button onClick={closeError}>
                <AiOutlineClose />
              </button>
            </div>
          )}
          {successMsg?.show && (
            <div className="flex w-1/3 items-center justify-between bg-green-500 p-2 text-gray-50 font-semibold">
              {successMsg.message}
              <button onClick={closeSuccess}>
                <AiOutlineClose />
              </button>
            </div>
          )}
          {otpScreen === true ? (
            <div className="w-full flex flex-col items-center gap-5">
              <p className="w-1/3 text-center text-gray-600 text-md font-light">
                Please Enter Your OTP
              </p>
              <div className="flex flex-col items-center gap-5">
                <input
                  type="number"
                  className="border-2 border-gray-500 w-64 py-2 px-2 border-gray-400 rounded-md font-semibold text-gray-700 focus:outline-non"
                  onChange={(e) => setOTP(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    verifyOTP();
                  }}
                  className="bg-teal-700 px-3 py-2 w-64 text-gray-50 rounded-md"
                >
                  Submit
                </button>
                <span className="text-sm font-semi-bold font-gray-400">
                  Don't receive OTP ?{" "}
                  <span
                    className="border-b border-gray-400 cursor-pointer"
                    onClick={verifyEmailAndSendOtp}
                  >
                    RESEND OTP
                  </span>
                </span>
              </div>
            </div>
          ) : changePasswordScreen === true ? (
            <div className="w-full flex flex-col items-center gap-5">
              <p className="w-1/3 text-center text-gray-600 text-md font-light">
                Reset Your password
              </p>
              <div className="flex flex-col items-center gap-5">
                <input
                  type="password"
                  placeholder="new password"
                  className="border-2 border-gray-500 w-64 py-2 px-2 rounded-md font-semibold text-gray-400 focus:outline-non"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="confirm password"
                  className="border-2 border-gray-500 w-64 py-2 px-2 rounded-md font-semibold text-gray-400 focus:outline-non"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  onClick={() => {
                    validateAndChangePassword();
                  }}
                  className="bg-teal-700 px-3 py-2 w-64 text-gray-50 rounded-md"
                >
                  Change Password
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-5">
              <p className="w-1/3 text-center text-gray-600 text-md font-light">
                To reset your password, enter your email below and submit. An
                email will be sent to you with an OTP.
              </p>
              <div className="flex flex-col items-center gap-5">
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="border-2 border-gray-500 w-64 py-2 px-2 border-gray-400 rounded-md font-semibold text-gray-700 focus:outline-non"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    verifyEmailAndSendOtp();
                  }}
                  className="bg-teal-700 px-3 py-2 w-64 text-gray-50 rounded-md"
                >
                  Reset Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
