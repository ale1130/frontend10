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
                res.send({message:"No promoter found"});
            }
        }
    );
})

app.post('/createplayer',(req, res)=>{

    const query = req.body.query;

    const finalQuery = "INSERT INTO users "+query;

    db.query(finalQuery, (err, result) =>
    
        {
            if(err){
                res.send({err:err});
            }

            if(result.length >0){
                res.send(result);
            }   
        }
    );
})

app.post('/checkuniqplayer',(req, res)=>{

    const query = req.body.query;
    
    db.query(query, (err, result) =>
    
        {
            if(err){
                res.send({err:err});
            }

            if(result.length >0){
                res.send({message:"found"});
            }else{
                res.send({message:"notfound"});
            } 
        }
    );
})

/*app.post('/getproviders', (req,res) =>{

    const condition = req.body.stringa;
    const skin = req.body.skin;

    db.query(
        "SELECT providers.* FROM games LEFT JOIN providers ON providers.id = games.provider_id JOIN skins_providers ON skins_providers.provider_id = providers.id WHERE skins_providers.skin_id = ? AND providers.stato = 1 AND skins_providers.view = 1 AND games.enabled = 1 AND games.category_id = 1 AND providers.name <> 'EvolutionX' AND providers.name <> 'EvolutionY' AND providers.name <> 'EvolutionZ' AND providers.special_provider = 0 ? GROUP BY providers.id ORDER BY skins_providers.priority DESC, providers.name ASC",
        [skin, condition],
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
})*/

app.listen(3001, ()=>{
    console.log("server running");
});