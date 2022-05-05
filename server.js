const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const Product = require("./models/productModel");
const allProducts = require("./AllProducts");
allProducts.forEach((product) => {
  delete product.id;
});

console.log(app.get("env")); // by default development
// console.log(process.env); //or process.config.USER or PORT

dotenv.config({ path: "./config.env" });

// let db = process.env.DATABASE_LOCAL;
let db =
  "mongodb+srv://meeshodb:meeshodb@cluster0.a7jj8.mongodb.net/meeshodb?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to " + db)) // DATABASE_LOCAL for local db
  .catch((err) => console.log(err));

// Product.deleteMany({}).then(() => console.log("done"));
// Product.insertMany(allProducts).then(() => console.log("done"));

const port = process.env.PORT || 9009;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
