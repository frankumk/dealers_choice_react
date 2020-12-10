const {expect} = require('chai');
const db = require('./server/db');
const app = require('supertest')('./server/index')
const syncAndSeed = require('./server/db');

describe('Routes',async()=>{
    describe('POST /api/friends',async()=>{
        it('creates a friend in birthday db',async()=>{
            const response = await app.post('/api/friends').send({name:'Charlie',birthday:'12/08/2020'});
            expect(response.map((friend)=>friend.name).filter((name)=>name==='Charlie').length).to.equal(1);
        })
    });

    describe('DELETE /api/friends',async()=>{
        it('deleted friend in birthday db',async()=>{
            const response = await app.delete('/api/friends').send({name: 'test',birthday: new Date()});
            expect(response.map((friend)=>friend.name).filter((name)=>name==='test').length).to.equal(0);

        })
    })
});