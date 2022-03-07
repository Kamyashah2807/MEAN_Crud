const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" })

const app = express();
const employeeController = require("./controllers/employee");

let URL = process.env.DATABASE

app.use(cors( {origin: 'http://localhost:4200'}));
app.use(bodyParser.json());

const db = require("./models");

db.mongoose.connect(URL, () => ({
    useNewUrlParser: true,
    useFindAndModify: false
}))
    .then(() => console.log('DB Connected'))
    .catch((err) => {
        console.log('connection failed');
    });


app.get("/", (req, res) => {
    res.status(200).send("Welcome to Mean Application");
});

app.use("/employees", employeeController);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
