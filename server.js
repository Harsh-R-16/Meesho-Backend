const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
// const allProducts = require("./AllProducts");
const Product = require("./models/productModel");

console.log(app.get("env")); // by default development
// console.log(process.env); //or process.config.USER or PORT

dotenv.config({ path: "./config.env" });

let db = process.env.DATABASE_LOCAL;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to " + db)) // DATABASE_LOCAL for local db
  .catch((err) => console.log(err));

// Product.deleteMany({}).then(() => console.log("done"));
// Product.insertMany(allProducts).then(() => console.log("done"));

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
