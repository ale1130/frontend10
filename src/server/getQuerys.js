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

app.post('/getskinsettings',(req, res)=>{

    const skinId = req.body.id;

    db.query(
        "SELECT * FROM skin_settings WHERE skinid = ?",
        [skinId],
        (err, result) =>{
            if(err){
                res.send({err:err});
            }

            if(result.length >0){
                res.send(result);
            }else{
                res.send({message:"No settings found"});
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

app.post('/changepassword',(req, res)=>{

    const newPassword = req.body.newP;

    const user_id = req.body.id;

    const passhash = req.body.passhash;

    db.query(
        "UPDATE users SET realpass = ? , passhash = ? WHERE id = ? ",
        [newPassword, passhash, user_id],
        (err, result) =>{
            if(err){
                res.send({error:err});
            }else{
                res.send({message:"complimenti il cambio password è avvenuto con successo, al prossimo caricamento della pagina ti verrà chiesto di effettuare nuovamente il login"});
            }  
        }
    );
})

app.post('/getdatapromo',(req, res)=>{

    const id = req.body.id;
    const skin_id = req.body.skin_id;

    db.query(
        "SELECT * FROM promotions WHERE id = ? AND skin_id = ?",
        [id, skin_id],
        (err, result) =>{
            if(err){

                res.send({err:err});
            }

            if(result.length >0){
                
                res.send(result);
            }else{

                res.send({message:"No promo found!"});
            }
        }
    );
})

app.post('/getshop',(req, res)=>{

    const shop_id = req.body.id;
    const skin_id = req.body.skin;
    const shop_level = req.body.shop_level;

    db.query(
        "SELECT * FROM users WHERE promoter_code = ? AND skin_id = ? AND user_level = ?",
        [shop_id, skin_id, shop_level],
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

app.post('/createplayer',(req, res)=>{

    console.log(req.body);

    db.query(
        "SELECT * FROM users",
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

app.listen(3001, ()=>{
    console.log("server running");
});