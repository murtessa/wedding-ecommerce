import { useState } from "react";
import axios from "axios";
import { FaUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const VerifyVendor = () => {
  const [businessLicense, setBusinessLicense] = useState(null);
  const [taxIdNumber, setTaxIdNumber] = useState(null);
  const [additionalDocs, setAdditionalDocs] = useState([]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + additionalDocs.length > 5) {
      setErrorMessage("You can upload a maximum of 5 additional documents.");
      return;
    }
    setAdditionalDocs([...additionalDocs, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData();
    if (businessLicense) formData.append("businessLicense", businessLicense);
    if (taxIdNumber) formData.append("taxIdentificationNumber", taxIdNumber);
    additionalDocs.forEach((doc) => formData.append("additionalDocs", doc));
    formData.append("street", street);
    formData.append("city", city);
    formData.append("region", region);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/upload-verification-docs",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSuccessMessage(response.data.message);
      setBusinessLicense(null);
      setTaxIdNumber(null);
      setAdditionalDocs([]);
      setStreet("");
      setCity("");
      setRegion("");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Vendor Verification
      </h2>

      {successMessage && (
        <div className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <FaCheckCircle className="text-xl mr-2" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <FaTimesCircle className="text-xl mr-2" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Business License
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => handleFileChange(e, setBusinessLicense)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Tax Identification Number
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => handleFileChange(e, setTaxIdNumber)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Additional Documents (Max 5)
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            multiple
            onChange={handleMultipleFileChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Street
            </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Street Address"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Region
            </label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Region"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Verification Docs"}
          <FaUpload className="ml-2" />
        </button>
      </form>
    </div>
  );
};

export default VerifyVendor;
