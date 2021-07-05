const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


const db = require("./app/models");
db.sequelize.sync();


var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.json({message: "Bem vindo a aplicação de Diego Pereira"});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}.`);
});