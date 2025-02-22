import { Link } from "react-router-dom";
import customer from "../assets/images/customer-icon.png";
import vendor from "../assets/images/vendor-icon.png";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-0 pb-10 px-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sign up as Customer */}
          <Link
            to="/register/customer"
            className="block bg-white p-6 rounded-lg shadow-md border border-gray-200 
                      hover:border-primary hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="text-center">
              <img
                src={customer}
                alt="Customer"
                className="w-20 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Sign up as Customer
              </h3>
              <p className="text-gray-600">
                Join as a customer and explore amazing wedding services.
              </p>
            </div>
          </Link>

          {/* Sign up as Vendor */}
          <Link
            to="/register/vendor"
            className="block bg-white p-6 rounded-lg shadow-md border border-gray-200 
                      hover:border-primary hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="text-center">
              <img src={vendor} alt="Vendor" className="w-20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Sign up as Vendor
              </h3>
              <p className="text-gray-600">
                Join as a vendor and showcase your wedding services.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
