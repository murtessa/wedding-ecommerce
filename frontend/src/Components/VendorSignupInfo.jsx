import { FaStore, FaCheckCircle } from "react-icons/fa";

const VendorSignupInfo = () => {
  return (
    <div className="flex flex-col items-center text-center bg-blue-50 p-8 rounded-lg shadow-md">
      <FaStore className="text-primary text-5xl mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Become a Vendor</h2>
      <p className="text-gray-600 mb-4">
        Expand your business and reach more customers with us.
      </p>
      <ul className="text-gray-600 space-y-2">
        <li className="flex items-center">
          <FaCheckCircle className="text-primary mr-2" /> Sell products &
          services
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-primary mr-2" /> Get verified & grow
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-primary mr-2" /> Increase revenue
          easily
        </li>
      </ul>
    </div>
  );
};

export default VendorSignupInfo;
