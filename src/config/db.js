const mongoose = require("mongoose")

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
};

module.exports = connect;