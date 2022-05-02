const express = require("express");
const morgan = require("morgan");
var cors = require("cors");

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
