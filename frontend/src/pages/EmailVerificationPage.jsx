import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import {toast} from "react-hot-toast"

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  

  const {error,isLoading,verifyEmail,checkAuth} = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    //Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      await checkAuth();
      navigate("/login");
      toast.success("Email verified successfully")
    } catch (error) {
      console.log(error)
    }
    
  };

  //Auto submit wher all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden ">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-4xl font-light tracking-wide text-white text-center mb-4">
          Verify Your Email
        </h2>

        <p className="text-center text-slate-400 text-sm mb-6">
          Enter the 6-digit code sent to your Email address.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="6"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center font-bold bg-gray-700 text-white border-2 border-gray-500 rounded-lg"
              />
            ))}
          </div>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <motion.button
            className="
        mt-5
        w-full
        py-3
        px-4
        bg-indigo-500/15
       
        text-indigo-200
        font-medium
        rounded-lg
        hover:bg-indigo-500/20
        hover:border-indigo-400/40
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-500/40
        transition-all
        duration-200
          "
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
          >
            {isLoading ? "Verifying . . ." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
