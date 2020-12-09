const express = require('express');
const {static} = express;
const path = require('path');
const moment = require('moment');
const Sequelize = require('sequelize')

const {db, syncAndSeed, Friend} = require('./db');

const app = express();

app.use('/dist',static(path.join(__dirname,'../dist')));
app.use('/assets',static(path.join(__dirname,'../assets')));
app.use(express.json());

app.get('/',(req,res,next)=> res.sendFile(path.join(__dirname,'../index.html')));

app.get('/api/friends',async(req,res,next)=>{
    try{
        res.send(await Friend.findAll({
            order: [
                ['name','ASC']
            ]
        }));
    }catch(ex){
        next(ex);
    }
})

app.post('/api/friends',async(req,res,next)=>{
    try{
        console.log(req.body);
        const newFriend = await Friend.create(req.body);
        await newFriend.save();
        res.send(await Friend.findAll({
            order: [
                ['name','ASC'] 
            ]
        }));
    }catch(ex){
        next(ex);
    }
})

app.get('/api/friends/:id',async(req,res,next)=>{
    try{
        res.send(await Friend.findByPk(req.params.id));
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

module.exports = app;