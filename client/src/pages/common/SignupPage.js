'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, User, Lock, Mail, MapPin, Building, Briefcase, Phone, Globe, Award, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { validateName, validateEmail, validatePassword, validatePhone, validateLanguages, validateYears } from '../../utils/validation'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

// Role fields configuration
const roleFields = {
  Guide: [
    { name: "experience", label: "Years of Experience", icon: Briefcase, type: "number", placeholder: "Years as a guide" },
    { name: "languages", label: "Languages Spoken", icon: Globe, type: "text", placeholder: "Languages you speak" },
    { name: "specialization", label: "Specialization", icon: Award, type: "text", placeholder: "Your speciality as a guide" },
    { name: "phone", label: "Contact Number", icon: Phone, type: "tel", placeholder: "Your phone number" },
  ],
  "Business Owner": [
    ]
}

const Signup = () => {
  const { signup, googleAuth, completeGoogleSignup, error } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState("Tourist")
  const [showRoleOptions, setShowRoleOptions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ role: "Tourist" })
  const [formError, setFormError] = useState(null)
  const [formSuccess, setFormSuccess] = useState(null)
  const [isGoogleSignup, setIsGoogleSignup] = useState(false)
  const [partialGoogleUser, setPartialGoogleUser] = useState(null)
  const [formErrors, setFormErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)


  useEffect(() => {
    if (error) {
      setFormError(error)
    }
  }, [error])

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole)
    setShowRoleOptions(false)
    setFormData(prev => ({
      ...prev,
      role: selectedRole
    }))
    setFormErrors({})
  }
  const handlePhoneChange = (value, country) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }))
    
    // Validate phone number
    const error = validatePhone(value);
    setFormErrors((prev) => ({
      ...prev,
      phone: error,
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    
    // Real-time validation
    let error = null;
    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'languages':
        error = validateLanguages(value);
        break;
      case 'experience':
        error = validateYears(value);
        break;
    }
    
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.role) {
      errors.role = 'Role selection is required'
    }

    if (!isGoogleSignup) {
      errors.name = validateName(formData.name);
      errors.email = validateEmail(formData.email);
      errors.password = validatePassword(formData.password);
    }

    if (formData.role !== 'Tourist') {
      roleFields[formData.role].forEach(field => {
        if (field.name === 'phone') {
          errors[field.name] = validatePhone(formData[field.name]);
        } else if (field.name === 'languages') {
          errors[field.name] = validateLanguages(formData[field.name]);
        } else if (field.name === 'experience') {
          errors[field.name] = validateYears(formData[field.name]);
        } else if (!formData[field.name] || formData[field.name].trim() === '') {
          errors[field.name] = `${field.label} is required`;
        }
      })
    }

    setFormErrors(errors)
    return Object.values(errors).every(error => error === null);
  }

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true);
      const result = await googleAuth();
      if (result.userExists) {
        setFormSuccess('You already have an account. Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else if (result.needsProfileCompletion) {
        setIsGoogleSignup(true);
        setPartialGoogleUser(result.partialUser);
      } else {
        setFormSuccess('Google signup successful!');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      console.error('Google signup error:', error);
      setFormError(error.message || 'Failed to sign up with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);
    setFormSuccess(null);
  
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
  
    try {
      let user;
      if (isGoogleSignup) {
        const additionalInfo = formData.role !== 'Tourist' 
          ? roleFields[formData.role].reduce((acc, field) => {
              acc[field.name] = formData[field.name];
              return acc;
            }, {})
          : {};
  
        user = await completeGoogleSignup({ 
          ...partialGoogleUser, 
          role: formData.role,
          ...additionalInfo
        });
      } else {
        const { email, password, name, role, ...additionalInfo } = formData;
        user = await signup(email, password, name, role, { 
          ...additionalInfo, 
          isProfileComplete: true // Explicitly set isProfileComplete to true
        });
      }
  
      setFormSuccess('Signup successful!');
      
      if (user.role === "Business Owner") {
        setTimeout(() => navigate('/setup-profile'), 2000);
      }
      else if (user.role === "Tourist") {
        setTimeout(() => navigate('/login'), 2000);
      } else {
        if (user.isProfileComplete) {
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setFormError('Please complete your profile to continue.');
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.message.includes('User already exists')) {
        setFormError('An account with this email already exists. Please try logging in.');
      } else {
        setFormError(error.message || 'Failed to create account');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Left Section - Sign Up Form */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-[40%] xl:w-[35%] px-4 py-8 md:px-8 lg:px-12 xl:px-16 flex items-center justify-center"
      >
        <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-10 space-y-6">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-2"
          >
            <h1 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-emerald-800">Join Our Travel Community</h1>
            <p className="text-sm md:text-base lg:text-lg text-emerald-600">Start your journey with us today</p>
          </motion.div>

          {/* Google Signup Button */}
          {!isGoogleSignup && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-emerald-200 rounded-full py-1 md:py-2 px-4 text-emerald-700 hover:bg-emerald-50 transition duration-300 text-sm md:text-base font-medium"
            >
              <img src="/images/google.png" alt="Google" className="w-5 h-5 md:w-6 md:h-6" />
              Continue with Google
            </motion.button>
          )}

          {/* Divider */}
          {!isGoogleSignup && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-emerald-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-emerald-700 text-xs md:text-sm">Or continue with email</span>
              </div>
            </div>
          )}

          {/* Error and Success Messages */}
          {formError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-xs md:text-sm" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{formError}</span>
            </div>
          )}

          {formSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded text-xs md:text-sm" role="alert">
              <strong className="font-bold">Success: </strong>
              <span className="block sm:inline">{formSuccess}</span>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isGoogleSignup && (
              <>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-emerald-700 h-4 w-4 md:h-5 md:w-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    onChange={handleInputChange}
                    className={`w-full bg-white border-2 ${
                      formErrors.name ? 'border-red-500' : 'border-emerald-200'
                    } rounded-full py-2 md:py-2 pl-10 md:pl-12 pr-4 text-emerald-700 placeholder-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white text-xs md:text-sm`}
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-emerald-700 h-4 w-4 md:h-5 md:w-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    onChange={handleInputChange}
                    className={`w-full bg-white border-2 ${
                      formErrors.email ? 'border-red-500' : 'border-emerald-200'
                    } rounded-full py-2 md:py-2 pl-10 md:pl-12 pr-4 text-emerald-700 placeholder-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white text-xs md:text-sm`}
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-emerald-700 h-4 w-4 md:h-5 md:w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                    onChange={handleInputChange}
                    className={`w-full bg-white border-2 ${
                      formErrors.password ? 'border-red-500' : 'border-emerald-200'
                    } rounded-full py-2 md:py-2 pl-10 md:pl-12 pr-12 text-emerald-700 placeholder-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white text-xs md:text-sm`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-emerald-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                </div>
              </>
            )}

            {/* Role Selector */}
            <div className="relative">
              <Globe className="absolute left-3 top-3 text-emerald-700 h-4 w-4 md:h-5 md:w-5" />
              <button
                type="button"
                className="w-full bg-white border-2 border-emerald-200 rounded-full py-2 md:py-2 pl-10 md:pl-12 pr-4 text-emerald-700 text-left focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs md:text-sm"
                onClick={() => setShowRoleOptions(!showRoleOptions)}
              >
                {formData.role || "Select Role"}
                <ChevronDown className="absolute right-3 top-3 text-emerald-400 h-4 w-4 md:h-5 md:w-5" />
              </button>
              <AnimatePresence>
                {showRoleOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-1 bg-white border-2 border-emerald-200 rounded-lg shadow-lg"
                  >
                    {["Tourist", "Guide", "Business Owner"].map((role) => (
                      <button
                        key={role}
                        type="button"
                        className="block w-full text-left px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-50"
                        onClick={() => handleRoleSelect(role)}
                      >
                        {role}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Additional Role-specific Fields */}
            <AnimatePresence mode="wait">
              {formData.role !== "Tourist" && roleFields[formData.role] && (
                <motion.div
                  key={formData.role}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  {roleFields[formData.role].map((field) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="relative"
                    >
                      {field.name === 'phone' ? (
                        <div>
                          <PhoneInput
                            country={'pk'}
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            inputProps={{
                              name: 'phone',
                              required: true,
                              className: 'w-full bg-white border-2 border-emerald-200 rounded-full py-2 md:py-2 pl-12 pr-4 text-emerald-700 placeholder-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white text-xs md:text-sm',
                            }}
                            containerClass="w-full"
                            dropdownClass="bg-white border-2 border-emerald-200 rounded-lg shadow-lg"
                          />
                        </div>
                      ) :  (
                        // Default Input Field
                        <>
                          <field.icon className="absolute left-3 top-3 text-emerald-700 h-4 w-4 md:h-5 md:w-5" />
                          <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={handleInputChange}
                            className={`w-full bg-white border-2 ${
                              formErrors[field.name] ? 'border-red-500' : 'border-emerald-200'
                            } rounded-full py-2 md:py-2 pl-10 md:pl-12 pr-4 text-emerald-700 placeholder-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white text-xs md:text-sm`}
                          />
                        </>
                      )}
                      {formErrors[field.name] && <p className="text-red-500 text-xs mt-1">{formErrors[field.name]}</p>}
                      {field.name === 'languages' && (
                        <p className="text-emerald-600 text-xs mt-1">e.g. English, Spanish, French</p>
                      )}
                      {field.name === 'specialization' && (
                        <p className="text-emerald-600 text-xs mt-1">e.g.Mountain Trekking, City Tours</p>
                      )}
                      {field.name === 'businessType' && (
                        <p className="text-emerald-600 text-xs mt-1">e.g. Hotel, Restaurant</p>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 md:py-3 rounded-full text-xs md:text-base font-semibold hover:bg-emerald-700 transition duration-300 disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>

          {/* Login Link */}
          <p className="text-center text-emerald-600 text-xs md:text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-800 font-semibold hover:underline">
              Log In
            </a>
          </p>
        </div>
      </motion.div>

      {/* Right Section - Hero Image */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:block lg:w-[60%] xl:w-[65%] relative bg-white"
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
          <div className="text-white text-center p-4 max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4"
            >
              Discover Amazing Places
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200"
            >
              Connect with travelers, guides, and local businesses worldwide. Your next adventure begins here!
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup