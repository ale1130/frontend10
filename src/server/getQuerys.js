const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const skinUrl = /*new URL(document.location.origin)*/ "https://betplay360.com/";

const db = mysql.createConnection({
    user:"gs_user",
    host:"51.91.73.185",
    password:"Eh~rg741",
    database:"gamesolutions"
});

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
                res.send({message:"errorilogin.credenziali"});
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
                res.send({message:"No promoter found"});
            }
        }
    );
})

app.post('/createplayer',(req, res)=>{

    const dati = req.body.data;

    console.log(dati);

    app.post({
        method:'post',
        url:skinUrl+"ajax/signup-new.php",
        data:dati
    })
})

app.post('/checkuniqplayer',(req, res)=>{

    const query = req.body.query;
    
    db.query(query, (err, result) =>
    
        {
            if(err){
                res.send({err:err});
            }

            if(result.length >0){
                res.send({message:"changedfound"});
            }else{
                res.send({message:"notfound"});
            } 
        }
    );
})

app.post('/checkuniqplayeremail',(req, res)=>{

    const query = req.body.query;
    
    db.query(query, (err, result) =>
    
        {
            if(err){
                res.send({err:err});
            }

            if(result.length >0){
                res.send({message:"changedfound"});
            }else{
                res.send({message:"notfound"});
            } 
        }
    );
})

app.post('/getuserid',(req, res)=>{

    const query = req.body.query;

    db.query(
        query,
        (err, result) =>{
            if(err){
                res.send({err:err});
            }

            if(result.length >0){
                res.send(result);
            }else{
                res.send({message:"No user id found"});
            }
        }
    );
})

app.post('/adduserpath',(req, res)=>{

    const query = req.body.query;

    db.query(
        query,
        (err, result) =>{
            if(err){
                res.send({err:err});
            }else{
                res.send();
            }
        }
    );
})

app.post('/modifylogin',(req, res)=>{

    const query = req.body.query;

    db.query(
        query,
        (err, result) =>{
            if(err){
                res.send({err:err});
            }else{
                res.send();
            }
        }
    );
})

app.post('/getproviders', (req,res) =>{

    const query = req.body.query;

    db.query(
        query,
        (err, result) =>{
            if(err){
                res.send({err:err});
            }

            if(result.length >0){
                res.send(result);
            }else{
                res.send({message:"no providers found"});
            }
        }
    );
})

app.post('/getjackpotswin', (req,res) =>{

    const query = req.body.query;

    db.query(
        query,
        (err, result) =>{
            if(err){
                res.send({err:err});
            }

            if(result.length >0){
                res.send(result);
            }else{
                res.send({message:"no jackpots found"});
            }
        }
    );
})

app.post('/getcasinogames', (req,res) =>{

    const query = req.body.query;

    db.query(
        query,
        (err, result) =>{
            if(err){
                res.send({err:err});
            }

            if(result.length >0){
                res.send(result);
            }else{
                res.send({message:"no games found"});
            }
        }
    );
})

app.post('/getcasinosubcategories', (req,res) =>{

    const query = req.body.query;

    db.query(
        query,
        (err, result) =>{
            if(err){
                res.send({err:err});
            }

            if(result.length >0){
                res.send(result);
            }else{
                res.send({message:"no subcategories found"});
            }
        }
    );
})


app.post('/getlanguages', (req,res) =>{

    const query = req.body.query;

    db.query(
        query,
        (err, result) =>{
            if(err){
                res.send({err:err});
            }

            if(result.length >0){
                res.send(result);
            }else{
                res.send({message:"no languages found"});
            }
        }
    );
})

app.listen(3001, ()=>{
    console.log("server running");
});