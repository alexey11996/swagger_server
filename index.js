const express = require("express");
const bodyParser = require("body-parser");
const myroutes = require(`./routes/myroutes`);

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const serverPort = process.env.PORT || 8080;

app.use(`/myroutes`, myroutes);

app.listen(serverPort, () =>
  console.log(`Server running on port ${serverPort}`)
);

app.get("/", (req, res) => res.send("Hello!!!"));
