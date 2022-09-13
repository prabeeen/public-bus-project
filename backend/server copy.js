const express = require("express");
const mongoose = require("mongoose");
//const Router = require("./routes");

const app = express();

// app.set('view engine', 'ejs');

app.use(express.json());

mongoose.connect(`mongodb+srv://srt:srtmongodb@cluster0.yfcy6ce.mongodb.net/?retryWrites=true&w=majority`);

// Check Connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


// Routes

const userRouter = require("./routes/users")
app.use("/users/api", userRouter);

const busRouter = require("./routes/bus")
app.use("/bus/api", busRouter);

const driverRouter = require("./routes/driver")
app.use("/driver/api", driverRouter);

const paymentRouter = require("./routes/payment")
app.use("/payment/api", paymentRouter)

const routeRouter = require("./routes/payment")
app.use("/route/api", routeRouter)

// Listen to PORT 3000

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});