const express = require("express");
const morgan = require("morgan");
var cors = require("cors");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_OnubQmqY8GahSs",
  key_secret: "I7b8J5m7VeCfcpWNi1lqev2f",
});

app.post("/verification", (req, res) => {
  // do a validation
  const secret = "12345678";

  console.log(req.body);

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  res.json({ status: "ok" });
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 1600;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: "xD1T-EA8-",
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// ******************************** //
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.time = new Date().toLocaleString();
  console.log(req.time);
  next();
});

// ******************************** //

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!!!",
    information: "Meesho Website Api",
  });
});

// ******************************** //

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "Not Found anything",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
