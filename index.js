const { faker } = require("@faker-js/faker");
const mysql = require("mysql2")
const express = require("express")
const app = express();
const path = require("path");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta_app",
    password: "Somil5515@",
});

try {

    connection.query("SHOW TABLES", (err, result) => {
        if (err) throw err;
        console.log(result);
    });
} catch (err) {
    console.log(err);
}

connection.end();

let createRandomUser = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),

    };
}






const port = 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

app.listen(port, () => {
    console.log(`Listening at port:${port}`)
})

app.get("/", (req, res) => {
    res.send("Server Working")
})