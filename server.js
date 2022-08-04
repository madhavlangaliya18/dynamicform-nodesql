require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/'));
app.use('/', require('./app/routes'));


const db = require('./app/models')
db.sequelize.sync({ force: true }).then(() => {
    console.log('---------Drop and re-sync db.');
});

const PORT = process.env.port || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
