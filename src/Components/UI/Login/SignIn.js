import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import linkedin from "../../../Assets/linkedin.svg";
import google from "../../../Assets/google.svg";
import Line from "../Utils/Line";
import { Authenticate } from "../../../firebase/firebase";
import { useDispatch } from "react-redux";
import { authAction } from "../../../store/auth-slice";

const SignIn = () => {
  const [loginState, setLoginState] = useState(false);
  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStateHandler = () => {
    setLoginState((prev) => !prev);
  };
  const title = loginState ? "Sign in" : "Join LinkedIn";
  const btnLevel = loginState ? "Sign in" : "Agree & Join";
  const term = loginState
    ? "Forgot password?"
    : "By clicking Agree & Join, you agree to the LinkedIn";
  const text = loginState ? "New to Linkedin?" : "Already on Linkedin?";
  const link = loginState ? "Join now" : "Sign in";

  const formSunmitHandler = async (e) => {
    e.preventDefault();
    if (!valid) {
      return;
    }
    // ################### Ready to send data to firebase for login ##############
    const user = await Authenticate({ signin: loginState, email, password });
    // console.log(user);
    if (!user) {
      alert("Something went wrong.......");
      return;
    }
    //  update Auth Store
    dispatch(
      authAction.login({
        uid: user.uid,
        token: user.accessToken,
        email: user.email,
      })
    );
    // ######## Redirect to Profile / Home page:

    if (loginState) {
      window.location.reload();
      navigate("/");
    } else {
      navigate("/my-profile?newuser=true");
    }

    // Reset values
    setEmail("");
    setPassword("");
  };
  let emailValue;
  let passwordValue;
  const inputHandler = (e, payload) => {
    emailValue = email;
    passwordValue = password;
    if (payload === "email") {
      emailValue = e.target.value?.trim();
      setEmail(emailValue);
    } else if (payload === "pass") {
      passwordValue = e.target.value?.trim();
      setPassword(passwordValue);
    }

    const validEmail =
      emailValue?.length > 10 &&
      emailValue.includes("@gmail.com") &&
      emailValue.substring(emailValue.length - 10) === "@gmail.com";
    const validPassword = passwordValue?.length >= 8;

    if (validEmail && validPassword) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <div className="w-[100%] h-screen flex  flex-col">
      <div className="flex ml-5 lg:ml-16 lg:w-[150px] lg:h-[80px] w-[100px] h-[50px]">
        <img className="w-[100%] h-[100%] object-cover" src={linkedin} alt="" />
      </div>
      <div className="  flex flex-col items-center rounded-md justify-center w-[100%] ">
        <form
          onSubmit={formSunmitHandler}
          className="flex flex-col p-5 w-[100%] rounded-t-md max-w-[400px] bg-white md:shadow-md md:shadow-gray-400/90"
        >
          <h1 className="text-4xl text-blue-600 pb-5">{title}</h1>
          <div className="flex flex-col pt-2 pb-2">
            <label className="pb-1 font-bold text-[14px] opacity-70">
              Email
            </label>
            <input
              className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              type="email"
              value={email}
              onChange={(e) => inputHandler(e, "email")}
              required
              placeholder={!loginState && "Email"}
            />
          </div>
          <div className="flex flex-col pt-2 pb-2">
            <label className="pb-1 font-bold text-[14px] opacity-70">
              Password
            </label>
            <input
              className="pl-5 border-[1.5px] rounded-sm hover:bg-gray-200 hover:border-[2px] hover:border-black border-gray-500 h-[50px]"
              type="password"
              value={password}
              onChange={(e) => inputHandler(e, "pass")}
              required
              placeholder={!loginState && "Password (8+ characters)"}
            />
          </div>
          <div>
            <p className="text-blue-600 text-justify text-[14px] font-bold opacity-80 pt-2 pb-2 hover:underline hover:text-slate-600 cursor-pointer">
              {term}
              {!loginState && (
                <span className="text-justify text-[14px] italic text-slate-600">
                  {" "}
                  User Agreement, Privacy Policy, and Cookie Policy.
                </span>
              )}
            </p>
          </div>
          <div className=" pt-3 ">
            <button
              className={`bg-blue-600 w-[100%] ${
                !valid && "opacity-30 cursor-not-allowed"
              } h-[45px] text-white font-bold rounded-3xl`}
            >
              {btnLevel}
            </button>
          </div>
        </form>
        <div className="w-[100%] pl-5 pr-5 max-w-[400px] md:shadow-md md:shadow-gray-400/90 bg-white flex items-center justify-between ">
          <div className="w-[45%]">
            <Line />
          </div>
          <p className="pl-2 pr-2 opacity-60">or</p>
          <div className="w-[45%]">
            <Line />
          </div>
        </div>
        <div className="w-[100%] p-5 rounded-b-md md:shadow-md md:shadow-gray-400/90 max-w-[400px] bg-white flex flex-col items-center justify-between ">
          <button className="border-[1.5px] flex items-center justify-center border-gray-300 w-[100%] h-[40px] opacity-60 text-black font-bold rounded-3xl">
            <img
              className="w-[20px] h-[20px] object-cover"
              src={google}
              alt=""
            />
            <p className="pl-2">Continue with google</p>
          </button>
          <p className="pt-3 pb-3 opacity-70 ">
            {text}
            <span
              onClick={loginStateHandler}
              className="text-blue-600
            cursor-pointer hover:underline pl-2"
            >
              {link}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
