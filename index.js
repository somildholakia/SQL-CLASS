const { faker } = require("@faker-js/faker");
const mysql = require("mysql2")
const express = require("express")
const app = express();
const path = require("path");
const method = require("method-override");

app.use(method("_method"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta_app",
    password: "Somil5515@",
});


// let createRandomUser = () => {
//     return [
//         faker.string.uuid(),
//         faker.internet.username(),
//         faker.internet.email(),
//         faker.internet.password(),

//     ]
// }

// let q = "INSERT INTO user (id,username,email,password) VALUES ?";

// let data = [];
// for (let i = 1; i <= 100; i++) {
//    data.push( createRandomUser());

// }

// try {

//     connection.query(q, [data], (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     });
// } catch (err) {
//     console.log(err);
// }


// connection.end();






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
    let q = `SELECT count(*) FROM user`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let count = (result[0]["count(*)"]);
            res.render("home.ejs",{count});
        })
    } catch (err) {
        console.log(err);
        res.send("error in dataBase")
    }
   
})

app.get("/user",(req,res) => {
    let q = `SELECT * FROM user`;

    try {
        connection.query(q,(err,result) => {
            if(err) throw err;
            // console.log(result);
            res.render("users.ejs",{ result });
        });
    } catch(err) {
        console.log(err);
        res.send("some error in DataBase");
    }
});

app.get("/user/:id/edit", (req,res) => {
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    // res.render("edit.ejs")

    try {
        connection.query(q,(err,result) => {
            if(err) throw err;
            let user = result[0];
            res.render("edit.ejs", { user });
        })
    } catch(err) {
        console.log("some err", err);
    }
})


app.patch("/user/:id",(req,res) => {
    res.send("updated")
})