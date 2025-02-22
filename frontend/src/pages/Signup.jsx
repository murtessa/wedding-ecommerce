import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc"; // ✅ Google Icon
import { GoogleLogin } from "@react-oauth/google"; // ✅ OAuth login

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.fullName]: e.target.value });
    setErrors({ ...errors, [e.target.fullName]: "" });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";

    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await axios.post("https://your-backend-api.com/signup", formData);
      setMessage("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Signup failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Create an Account
        </h2>

        {message && (
          <p className="text-center text-green-500 mb-4">{message}</p>
        )}

        {/* Google Login Button with Icon */}
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              await axios.post("https://your-backend-api.com/google-signup", {
                token: credentialResponse.credential,
              });
              navigate("/dashboard");
            } catch (error) {
              setMessage("Google sign-up failed. Try again.");
            }
          }}
          onError={() => {
            setMessage("Google sign-up failed. Try again.");
          }}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              <FcGoogle className="text-2xl mr-2" />
              Sign up with Google
            </button>
          )}
        />

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-primary"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-primary"
              placeholder="example@domain.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-primary"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-primary"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <p className="text-center text-gray-600 text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
