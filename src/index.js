const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const cors = require("cors");

const app = express();
app.use(express.json());
env.config();

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] MongoDB Connected!");
  })
  .catch((err) => {
    console.log("\x1b[41m%s\x1b[0m", "[FAILED] Connection to MongoDB!", err);
  });

const corsOptions = {
  origin: "*", // Allow requests from any origin
};

app.use(cors(corsOptions));

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(process.env.PORT, () => {
  console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] backend started!");
});

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});
