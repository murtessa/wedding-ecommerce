import VerifyVendor from "../Components/VerifyVendor";
import VendorInfo from "../Components/VendorInfo";

const VendorVerification = ({ userId }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Vendor Verification
      </h1>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        {/* Vendor Details Section */}
        <VendorInfo userId={userId} />

        <div className="my-6 border-t border-gray-300"></div>

        {/* Document Upload Section */}
        <VerifyVendor userId={userId} />
      </div>
    </div>
  );
};

export default VendorVerification;
