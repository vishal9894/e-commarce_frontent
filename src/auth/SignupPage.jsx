import React, { useState } from 'react'
import { BiUser, BiLock, BiEnvelope, BiShow, BiHide } from 'react-icons/bi'
import signupImage from "../assets/loginimage.jpg"
import axios from "axios"

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      `http://localhost:3000/api/user/signup`,
      {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password: formData.password
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    
     window.location.href = "/"
      localStorage.setItem(response.data.token)
    // Handle successful response
    console.log("Signup successful:", response.data);
    
    
  } catch (error) {
    console.log("Signup error:", error);
    // Add proper error handling here
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - Image */}
        <div className="lg:w-1/2 relative">
          <img
            src={signupImage}
            alt="Join us"
            className="w-full h-64 lg:h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/10"></div>

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/60 to-transparent">
            <h1 className="text-3xl font-bold mb-2">
              Join <span className="text-blue-300">VishalMart</span>
            </h1>
            <p className="text-blue-100">
              Create your account and discover amazing products
            </p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="lg:w-1/2 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Create Account
            </h2>
            <p className="text-gray-600 mt-2">
              Join us today and start shopping
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <div className="relative">
                  <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-gray-50 text-gray-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <div className="relative">
                  <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-gray-50 text-gray-800"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <BiEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-gray-50 text-gray-800"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <BiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-gray-50 text-gray-800"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <BiHide className="w-4 h-4" /> : <BiShow className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <label className="flex items-start space-x-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-300 mt-1" required />
              <span className="text-sm text-gray-700">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?
              <a
                href="/login"
                className="ml-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage