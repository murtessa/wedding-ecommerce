import { IoClose } from "react-icons/io5";
import { MdCheckCircle } from "react-icons/md";

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Success!</h3>
        <div className="flex items-center text-green-600 text-center mb-4">
          <MdCheckCircle className="text-2xl mr-2" /> {message}
        </div>

        {/* Additional message */}
        <p className="text-gray-400 mt-2 text-center">
          Please verify your email to log in, Verification email is sent to your
          Email
        </p>

        {/* OK Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-primary text-white py-2 rounded-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
