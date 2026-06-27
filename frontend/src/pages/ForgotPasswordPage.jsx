import { motion } from "framer-motion"
import { useState } from "react"
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, LoaderCircleIcon, Mail } from "lucide-react";
import { Link } from "react-router-dom";





const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {isLoading, forgotPassword} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  }

  return (
     <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-slate-900/50 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-500"
    >
    <div className="p-8 ">
      <h2 className="text-2xl font-light tracking-wide text-white text-center mb-4 ">
        Forgot Password
      </h2>

      {!isSubmitted?(
        <form onSubmit={handleSubmit}>
          <p className="text-gray-300/50 mb-6 text-center text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>
           <Input 
           icon={Mail}
           placeholder='Email Address'
           type='email'
           value={email}
           onChange={(e)=> setEmail(e.target.value)}
           required           
           />


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
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircleIcon className="size-6 animate-spin  mx-auto" />
            ) : (
              <p className="text-lg">Send Reset Link</p>
            )}
          </motion.button>
        </form>
       
      ):(
        <div className="text-center">
          <motion.div
          initial={{scale : 0}}
          animate={{scale: 1}}
          transition={{type:"spring" , stiffness:500, damping:30}}
          className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4"          
          >
            <Mail className="size-8 text-white"/>
            
          </motion.div>
          <p className="mb-6 text-gray-300">
            If an account exists for {email}, you will receive a password reset link shortly.
          </p>
        </div>
      )}
    </div>
    <div className="px-8 py-4 bg-gray-900 bg-opacity flex justify-center">
      <Link to={"/login"} className="text-sm text-indigo-400 hover:underline flex items-center">
      <ArrowLeft className="h-4 w-4 mr-2"/> Back to Login
      </Link>

    </div>


    </motion.div>
  )
}

export default ForgotPasswordPage
