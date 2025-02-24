import vendor from "../assets/images/vendor-docs.png";

const VendorInfo = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-3/4 mx-auto">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Vendor Information
      </h2>
      <p className="text-gray-600">
        Ensure your business is verified by uploading the necessary documents.
      </p>
      <img src={vendor} alt="Verification" className="mt-4 w-48 mx-auto" />
    </div>
  );
};

export default VendorInfo;
