const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user:"gs_user",
    host:"51.91.73.185",
    password:"Eh~rg741",
    database:"gamesolutions"
});

app.post('/getdataskin',(req, res)=>{

    const skinId = req.body.skinid;

    db.query(
        "SELECT * FROM skins WHERE id = ?",
        [skinId],
        (err, result) =>{
            if(err){
                res.send({err:err});
            }

            if(result.length >0){
                res.send(result);
            }else{
                res.send({message:"Error"});
            }
        }
    );
})

app.post('/getuserdata',(req, res)=>{

    const username = req.body.username;
    const password = req.body.password;
    const skin_id = req.body.skin;

    db.query(
        "SELECT * FROM users WHERE username = ? AND realpass = ? AND skin_id = ?",
        [username, password, skin_id],
        (err, result) =>{
            if(err){
                res.send({err:err});
            }

            if(result.length >0){
                res.send(result);
            }else{
                res.send({message:"Incorrect credential!"});
            }
        }
    );
})

app.post('/getuserdatacookie',(req, res)=>{

    const username = req.body.username;
    const passhash = req.body.passhash;
    const skin_id = req.body.skin;

    db.query(
        "SELECT * FROM users WHERE username = ? AND passhash = ? AND skin_id = ?",
        [username, passhash, skin_id],
        (err, result) =>{
            if(err){

                res.send({err:err});
            }

            if(result.length >0){
                
                res.send(result);
            }else{

                res.send({message:"No user found!"});
            }
        }
    );
})

app.listen(3001, ()=>{
    console.log("server running");
});