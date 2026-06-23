import { useState } from "react";
import {motion} from 'framer-motion';
import { Mail,Lock, Loader, Eye , EyeOff ,LoaderCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

import Input from "../components/Input";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = false;
  const handleLogin = (e) => {
    e.preventDefault();
  }

  return (  <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-slate-900/50 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden "
    >
     <div className="p-8">
        <h2 className="text-4xl font-light tracking-wide text-white text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-slate-400 text-sm mb-6">
          Sign in to continue your journey.
        </p>
         <form onSubmit={handleLogin}>
            <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={showPassword ? EyeOff : Eye}
            onRightIconClick={() => setShowPassword(!showPassword)}
          />
          <div className="flex items-center mb-6">
            <Link to="/forgot-password" className="text-sm text-slate-200 hover:text-white transition-colors duration-200" >
             Forgot password ?
            </Link>
          </div>

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
          {isLoading?<LoaderCircleIcon className="size-6 animate-spin  mx-auto"/>:"Login"}
          </motion.button>
        </form>
        </div>
         <div className="px-8 py-4 border-t border-white/5 flex justify-center bg-gray-900">
        <p className="text-sm text-slate-400">
          Don't have an account ?{" "}
          <Link
            to="/signup"
            className="text-slate-200 hover:text-white transition-colors duration-200"
          >
            SignUp
          </Link>
        </p>

       
      </div>

    </motion.div>);
};

export default LoginPage;
