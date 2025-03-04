import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Popup from "./Popup";

const VendorSignup = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+251");
  const [showPopup, setShowPopup] = useState(false);

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("+251")) value = "+251";
    if (/^\+251\d{0,9}$/.test(value)) {
      setPhoneNumber(value);
      setValue("phoneNumber", value, { shouldValidate: true });
    }
  };

  const handleGoogleSignup = () => {
    const role = localStorage.getItem("role") || "vendor";
    window.location.href = `http://localhost:5000/api/auth/google?role=${role}`;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          role: "vendor",
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          businessName: data.businessName,
          password: data.password,
        }
      );
      setMessage(response.data.message || "Registration successful!");
      setShowPopup(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Vendor Sign Up
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full p-3 border rounded-lg"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phoneNumber", {
                required: "Phone Number is required",
                pattern: {
                  value: /^\+251\d{9}$/,
                  message: "Invalid phone number format",
                },
              })}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              Business Name
            </label>
            <input
              type="text"
              {...register("businessName", {
                required: "Business Name is required",
              })}
              className="w-full p-3 border rounded-lg"
            />
            {errors.businessName && (
              <p className="text-red-500 text-sm">
                {errors.businessName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full p-3 border rounded-lg"
              />
              <button
                type="button"
                className="absolute right-3 inset-y-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full p-3 border rounded-lg"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center w-full bg-white text-gray-700 font-semibold py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition duration-300 shadow-sm"
        >
          <FcGoogle className="text-2xl mr-2" /> Sign in with Google
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-semibold">
            Login
          </a>
        </p>
      </div>

      {showPopup && (
        <Popup message={message} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default VendorSignup;
