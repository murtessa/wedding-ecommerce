const app = require("./app.js");
const PORT = process.env.PORT || 5000;

const dotenv = require("dotenv");

dotenv.config();

app.get("/", (req, res) => {
  res.send("Wedding E-commerce API is running...");
});

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`
  );
});
