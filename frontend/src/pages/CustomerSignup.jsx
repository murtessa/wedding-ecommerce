import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { FiEye, FiEyeOff } from "react-icons/fi"; // Eye Icons for password visibility
import { MdCheckCircle } from "react-icons/md"; // Success Icon

const CustomerSignup = () => {
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
  const [showForm, setShowForm] = useState(true); // Hide form after success
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const navigate = useNavigate();

  // State for storing phone number, initialized with +251
  const [phoneNumber, setPhoneNumber] = useState("+251");

  // Handle phone number change and update state
  const handlePhoneNumberChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+251")) {
      value = "+251";
    }

    // Allow only numeric input after +251 and limit to 12 characters total
    if (/^\+251\d{0,9}$/.test(value)) {
      setPhoneNumber(value);
      setValue("phoneNumber", value, { shouldValidate: true }); // Sync with react-hook-form
      console.log("Phone number updated:", value);
    }
  };

  // Google Signup Redirect
  const handleGoogleSignup = () => {
    const role = localStorage.getItem("role") || "customer"; // Get role from storage
    console.log("Role:", role);
    window.location.href = `http://localhost:5000/api/users/google?role=${role}`;
  };

  // Handle Form Submission for Normal Signup
  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // The phoneNumber field already has the "+251" country code, so it's ready to submit
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          role: "customer",
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
        }
      );

      setMessage(response.data.message || "Registration successful!");
      setShowForm(false); // Hide form after successful submission
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
          Customer Sign Up
        </h2>

        {/* Display messages from backend */}
        {message && (
          <div className="flex items-center text-green-600 text-center mb-4">
            <MdCheckCircle className="text-2xl mr-2" /> {message}
          </div>
        )}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-semibold">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName", { required: "Full Name is required" })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Phone Number
              </label>
              <input
                type="text"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^\+251\d{9,9}$/, // Ethiopian phone number validation
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
            {/* Password */}
            <div>
              <label className="block text-gray-700 font-semibold">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
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
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-opacity-90 transition duration-300"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>
        )}

        {/* OR separator */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center w-full bg-white text-gray-700 font-semibold py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition duration-300 shadow-sm"
        >
          <FcGoogle className="text-2xl mr-2" />
          Sign in with Google
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default CustomerSignup;
