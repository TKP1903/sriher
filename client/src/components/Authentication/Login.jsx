import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
//Redux actins
import { signIn } from "../../Redux/Reducer/Auth/auth.action";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    show: false,
    hide: true,
    message: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();

  const reduxState = useSelector((globalState) => globalState.AuthReducer);

  const submit = () => {
    setValues({
      email: "",
      password: "",
      showPassword: false,
    });
    dispatch(signIn(values));
    if (reduxState?.error?.response) {
      setErrorMsg({
        show: true,
        hide: false,
        message: reduxState?.error.response?.data?.error,
      });
    }
  };

  const closeError = () => {
    setErrorMsg({
      show: false,
      hide: true,
      message: "",
    });
  };
  const registrationType = [{ value: "" }];

  return (
    <>
      <div className="">
        <div className="flex flex-col items-center justify-center gap-4 mx-3">
          <div className="w-full md:w-96 px-3 md:px-12 py-5 pb-10 flex flex-col items-end justify-center gap-5 bg-gray-50 border rounded-md shadow-xl">
            <h2 className="mx-40 text-2xl font-bold text-gray-500">Login</h2>
            {errorMsg?.show && (
              <div className="flex w-full items-center justify-between bg-red-500 p-2 text-white font-light">
                {errorMsg.message}
                <button onClick={closeError}>
                  <AiOutlineClose />
                </button>
              </div>
            )}
            <TextField
              required
              id="outlined-required"
              label="enter your email"
              fullWidth
              value={values.email}
              onChange={(e) => setValues({ email: e.target.value })}
            />
            <span className="mx-2 w-full">
              <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </span>
            <Button
              variant="outlined"
              fullWidth
              className="h-14"
              onClick={submit}
            >
              Login
            </Button>
            <div className="border-b border-gray-200">
              <Link
                to="/forgotpassword"
                className="text-md font-gray-400 font-light w-full"
              >
                Forgot Password ?
              </Link>
              {/* <span className="text-blue-900 font-semibold">click here</span> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;