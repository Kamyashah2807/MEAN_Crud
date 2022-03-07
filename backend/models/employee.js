const mongoose = require("mongoose");

const Employee = mongoose.model(
    "Employee",
    new mongoose.Schema({
        name: String,
        email: String,
        salary: Number,
    })
);

module.exports = Employee;