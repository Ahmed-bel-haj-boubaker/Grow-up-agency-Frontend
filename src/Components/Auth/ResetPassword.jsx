import axios from "axios";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetPasswordRoute } from "../../Api's/AuthApi";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event);
  };
  const handleNewPassword = (event) => {
    setPassword(event);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event);
  };

  const handleSubmit = async () => {
    if (newPassword != confirmPassword) {
      toast.error("Password does not match", toastOptions);
    } else {
      const res = axios
        .put(resetPasswordRoute, { email, newPassword })
        .then(() => {
          toast.success("Password reset successfully", toastOptions);
          setTimeout(() => {
            navigate("/");
          }, 4000);
        })
        .catch(() => {
          toast.error("Error resetting password", toastOptions);
        });
      console.log(res);
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  return (
    <div className="mx-auto max-w-md space-y-6 justify-center items-center ">
      <ToastContainer />
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium">Reset password</h1>
        <p className="text-slate-500">Fill up the form to reset the password</p>

        <form onSubmit={handleSubmit} className="my-10">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address</p>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
                onChange={(e) => handleEmail(e.target.value)}
              />
            </label>
            <label htmlFor="newPassword">
              <p className="font-medium text-slate-700 pb-2">New Password</p>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter New Password"
                onChange={(e) => handleNewPassword(e.target.value)}
              />
            </label>
            <label htmlFor="confirmPassword">
              <p className="font-medium text-slate-700 pb-2">
                Confirm Password
              </p>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter Confirm Password"
                onChange={(e) => handleConfirmPassword(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>

              <span>Reset password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
