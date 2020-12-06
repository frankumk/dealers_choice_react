//db = birthdays
const Sequelize = require('sequelize')
const { STRING } = Sequelize;
const { DATEONLY, INTEGER, VIRTUAL } = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/birthdays')

const Friend = db.define('friend',{
    name: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    birthday: {
        type: DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
        },
        // get(){
        //     const raw = this.getDataValue(birthday)
        //     return raw ? new Date(raw) : null;
        // }
    },
    notes: {
        type: STRING
    },
    age: {
        type: INTEGER,
        // set(bday){
        //     const today = new Date();
        //     const b = new Date(this.getDataValue(birthday));
        //     const diff = today - b;
        //     this.setDataValue("age",Math.round(diff/(1000*60*60*24)));
        // },
    }

})

const syncAndSeed = async()=>{
    await db.sync({ force: true });
    await Promise.all([
        Friend.create({name: 'Kayla', birthday: '1989/01/14'}),
        Friend.create({name: 'Max', birthday: '08/21'}),
        Friend.create({name: 'Rosemary', birthday: '12/15', notes: 'dog stuff'}),
        Friend.create({name: 'Mom', birthday: '04/03'}),
        Friend.create({name: 'Dad', birthday: '01/11'}),
    ])
    const Nikolai = await Friend.create({name: 'Nikolai', birthday: '03/21/1988', age: 32});
    const test = await Friend.create({name: 'tester', birthday: new Date()});
    console.log(new Date(Nikolai.birthday));

}

module.exports = {
    db,
    syncAndSeed,
    Friend
}