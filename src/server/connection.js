/*const express = require("express");
const mysql = require("mysql");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user:"gs_user",
    host:"localhost",
    password:"Eh~rg741",
    database:"gamesolutions"
});

app.post('/getdatas',(req, res)=>{
    db.query(
        "SELECT * FROM skins",
        (err, result) =>{
            console.log(err);
        }
    );
})

app.listen(3001, ()=>{
    console.log("server running");
});*/