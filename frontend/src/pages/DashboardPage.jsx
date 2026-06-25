import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date.js";
import { LoaderCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";


const DashboardPage = () => {
  const { user,logout,isLoading } = useAuthStore();
  console.log("Raw lastLogin:", user.lastLogin);
  console.log("Date object:", new Date(user.lastLogin));
  console.log("Formatted:", formatDate(user.lastLogin));
  
  


  const handleLogout = async (e) => {
   e.preventDefault();
   try {
    await logout();   
    
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-8 w-full mt-10 bg-slate-900/50 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden "
    >
      <h2 className="text-2xl font-light tracking-wide text-white text-center mb-2">
        Dashboard
      </h2>

      <div className="space-y-6">
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-indigo-400 mb-3">
            Profile Information
          </h3>
          <p className="text-gray-300">Name: {user.name}</p>
          <p className="text-gray-300">Email: {user.email}</p>
        </motion.div>

        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-indigo-400 mb-3">
            Account Activity
          </h3>
          <p className="text-gray-300">
            <span className="font-bold">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-300">
            <span className="font-bold">Last Login: </span>
            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
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
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircleIcon className="size-6 animate-spin  mx-auto" />
            ) : (
              <p className="text-xl">Logout</p>
            )}
          </motion.button>
    </motion.div>
  );
};

export default DashboardPage;
