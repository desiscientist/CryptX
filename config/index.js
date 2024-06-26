const mongoose = require("mongoose");
const initData = require("./db.js");
const User = require("./models/User.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/cryptx";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await User.deleteMany({});
  await User.insertMany(initData.data);
  console.log("data was inserted");
};

initDB();
