import VendorSignup from "../Components/VendorSignup";
import VendorSignupInfo from "../Components/VendorSignupInfo";
import { Link } from "react-router-dom";
const VendorSignupPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Vendor Signup Form (65%) */}
        <div className="w-2/3 p-8">
          <VendorSignup />
        </div>

        {/* Right Side - Vendor Signup Info (35%) */}
        <div className="w-1/3 bg-secondary text-white flex flex-col items-center justify-center p-6">
          <VendorSignupInfo />
          <img
            src="https://source.unsplash.com/300x300/?business,shop"
            alt="Vendor Signup"
            className="mt-4 w-40 h-40 object-cover rounded-full shadow-lg"
          />
        </div>

        <Link
          to="/verify-vendor"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition duration-300"
        >
          Verify docs
        </Link>
      </div>
    </div>
  );
};

export default VendorSignupPage;
