require("dotenv").config();

const mongoose = require("mongoose");

const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongoDb Connnection  succesfully`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connection;
