import axios from "axios";
import { useState } from "react";
import { forgotPasswordRoute, verifyResetCodeRoute } from "../../Api's/AuthApi";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyResetCode = () => {
  const location = useLocation();

  const email = location.state?.email; // Access the passed email
  console.log(email);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const navigate = useNavigate();
  const handleChange = (e, index) => {
    const newCode = [...code];
    const value = e.target.value;
    if (value.length <= 1 && !isNaN(value)) {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to next input
      if (value !== "" && index < code.length - 1) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && code[index] === "") {
      // Move focus to previous input on backspace
      if (index > 0) {
        document.getElementById(`code-input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(verifyResetCodeRoute, {
        resetCode: code.join(""),
      });
      toast.success(
        "Reset code verified successfully! Redirecting to password reset page...",
        toastOptions
      );

      setTimeout(() => {
        navigate("/resetPassword");
      }, 4000);
    } catch (error) {
      console.log(error);
      toast.error("reset code is incorrect", toastOptions);
    }
  };
  const handleResendCode = async (e) => {
    e.preventDefault();
    try {
      await axios.post(forgotPasswordRoute, {
        email,
      });
      toast.success(
        "The code verification is sent to this email",
        toastOptions
      );
      setTimeout(() => {
        navigate("/verifyResetCode");
      }, 4000);
    } catch (err) {
      toast.error(err.response.data.message, toastOptions);
    }
  };
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center h-screen w-full">
      <ToastContainer />
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Verify Your Identity
        </h1>

        <div className="grid grid-cols-6 gap-x-4 my-4">
          {code.map((value, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              className="rounded-lg bg-gray-200 cursor-text dark:bg-gray-700 w-14 aspect-square flex items-center justify-center text-center text-gray-900 dark:text-white font-semibold shadow-sm"
            />
          ))}
        </div>
        <div className="flex flex-col items-center justify-between mb-8">
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
            Didn’t receive a code?
          </p>
          <button
            onClick={handleResendCode}
            className="px-4 py-2 text-sm font-medium text-center rounded bg-transparent border border-gray-400 text-gray-600 hover:text-white hover:bg-gray-600 transition duration-200"
          >
            Resend Code
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 text-lg font-medium text-white bg-gradient-to-r from-green-500 to-teal-600 rounded-md hover:from-green-600 hover:to-teal-700 shadow-md transition duration-200"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyResetCode;
