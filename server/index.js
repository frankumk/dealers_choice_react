const express = require('express');
const {static} = express;
const path = require('path');

const {db, syncAndSeed, Friend} = require('./db');

const app = express();

app.use('/dist',static(path.join(__dirname,'../dist')));

app.get('/',(req,res,next)=> res.sendFile(path.join(__dirname,'../index.html')));

app.get('/api/friends',async(req,res,next)=>{
    try{
        res.send(await Friend.findAll());
    }catch(ex){
        next(ex);
    }
})

const init = async()=>{
    try{
        await db.authenticate();
        await syncAndSeed();

        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listening on port ${port}`));
    }catch(ex){
        console.log(ex);
    }
}

init();