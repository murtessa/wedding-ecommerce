const express = require("express");
const {
  registerCustomer,
  registerVendorStep1,
  registerVendorStep2,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Customer Registration (One Step)
router.post("/register", registerCustomer);

// Vendor Registration (Step 1: Basic Info)
router.post("/register/vendor/step1", registerVendorStep1);

// Vendor Registration (Step 2: Business Verification)
router.post("/register/vendor/step2", registerVendorStep2);

module.exports = router;
