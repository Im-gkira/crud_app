const express = require("express");
const app = express();
const dotenv = require("dotenv");
const http = require("http");
const {config} = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require('./Server/database/connection');

dotenv.config({path: "config.env"});

// log requests
app.use(morgan('tiny'));


connectDB();
// parse request to body-parser
app.use(bodyParser.urlencoded({extended: true}))

// set view engine
app.set("view engine", "ejs")

// load assests
app.use("/css", express.static(path.resolve(__dirname, "Assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "Assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "Assets/js")));


let PORT = process.env.PORT || 3000;


//load routers

app.use('/',require('./Server/Routes/router'))


app.listen(PORT, () => {
    console.log(`server is up at ${PORT}`);
})

