import React, { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const { login, googleAuth, checkUserExists, error } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [formError, setFormError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setFormError(null)
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await googleAuth();
      if (result.needsProfileCompletion) {
        navigate('/signup?google=true', { state: { partialUser: result.partialUser } });
      } else if (result.user && result.user.role) {
        navigate(getDashboardRoute(result.user.role));
      } else {
        setFormError('Unable to determine user role. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Google login error:', error);
      setFormError(error.message || 'Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);

    try {
      const userExists = await checkUserExists(formData.email);
      if (!userExists) {
        setFormError("No account found with this email. Please sign up first.");
        setIsLoading(false);
        return;
      }
      const user = await login(formData.email, formData.password);
      if (user && user.role) {
        navigate(getDashboardRoute(user.role));
      } else {
        setFormError('Unable to determine user role. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setFormError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const getDashboardRoute = (role) => {
    switch (role) {
      case 'Tourist':
        return '/tourist-dashboard'
      case 'Guide':
        return '/guide-dashboard'
      case 'Business Owner':
        return '/business-dashboard'
      default:
        return '/dashboard'
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Content Container */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full">
        {/* Left Section - Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[40%] xl:w-[35%] min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex items-center justify-center"
        >
          <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-2 sm:space-y-3"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-emerald-800">Welcome Back</h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-emerald-600">Log in to your account</p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-white border-2 border-emerald-200 rounded-full py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 text-emerald-700 hover:bg-emerald-50 transition duration-300 text-sm sm:text-base md:text-lg font-medium"
            >
              <img src="/images/google.png" alt="Google" className="w-5 h-5 sm:w-6 sm:h-6" />
              Continue with Google
            </motion.button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-emerald-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 sm:px-4 bg-white text-emerald-700 text-xs sm:text-sm md:text-base">Or continue with email</span>
              </div>
            </div>

            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="relative">
                <Mail className="absolute left-2.5 sm:left-3.5 top-2.5 sm:top-3.5 text-emerald-700 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  onChange={handleInputChange}
                  className="w-full bg-white border-2 border-emerald-200 rounded-full py-2 sm:py-2.5 pl-8 sm:pl-12 pr-3 sm:pr-4 text-emerald-700 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-xs sm:text-sm md:text-base"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-2.5 sm:left-3.5 top-2.5 sm:top-3.5 text-emerald-700 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handleInputChange}
                  className="w-full bg-white border-2 border-emerald-200 rounded-full py-2 sm:py-2.5 pl-8 sm:pl-12 pr-10 sm:pr-12 text-emerald-700 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-xs sm:text-sm md:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 sm:right-3.5 top-2.5 sm:top-3.5 text-emerald-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 sm:py-2.5 md:py-3 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-emerald-700 transition duration-300 disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </motion.button>
            </form>

            <p className="text-center text-emerald-600 text-xs sm:text-sm md:text-base">
              Don't have an account?{" "}
              <Link to="/signup" className="text-emerald-800 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Right Section - Hero Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[60%] xl:w-[65%] relative bg-white"
          style={{ minHeight: '100vh' }}
        >
          <div className="absolute inset-0 lg:rounded-l-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/90 to-transparent z-10" />
            <div className="w-full h-full sticky top-0">
              <img
                src="/images/abcd.jpg"
                alt="Travel Destination"
                className="object-cover h-full w-full opacity-75"
                width="1920"
                height="1080"
              />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-white text-center p-4 sm:p-6 md:p-8 max-w-3xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6"
              >
                Welcome Back Explorer
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200"
              >
                Your next adventure awaits. Log in to continue your journey!
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login

