//db = birthdays
const Sequelize = require('sequelize')
const moment = require('moment');
const faker = require('faker');
const { STRING } = Sequelize;
const { DATEONLY, INTEGER, VIRTUAL } = Sequelize
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/birthdays')

let config;
if (process.env.DATABASE_URL) {
  config = {
    logging: false,
    operatorsAliases: false,
    dialect: "postgres",
    protocol: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
} else {
  config = {
    logging: false,
    operatorsAliases: false,
  }
}
const client = new Sequelize('postgres://localhost/birthdays', config)


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
        //     return(moment(this.getDataValue(birthday)))
            
        // } think on beforeCreate
    },
    email: {
        type: STRING
    },
    notes: {
        type: STRING
    },
    age: {
        type: INTEGER,
    }

})

const syncAndSeed = async()=>{
    await db.sync({ force: true });
    // await Promise.all([
    //     Friend.create({name: 'Kayla', birthday: '1989/01/14', email: 'frankumk@gmail.com'}),
    //     Friend.create({name: 'Max', birthday: '08/21'}),
    //     Friend.create({name: 'Rosemary', birthday: '12/15', notes: 'dog stuff'}),
    //     Friend.create({name: 'Mom', birthday: '04/03'}),
    //     Friend.create({name: 'Dad', birthday: '01/11'}),
    //     Friend.create({name: 'Alicia', birthday: '01/06/1989'})
    // ])
    //const Nikolai = await Friend.create({name: 'Nikolai', birthday: '03/21/1988', age: 32});
    const test = await Friend.create({name: 'test', birthday: new Date()});
    //const test2 = await Friend.create({name: 'test everyday', birthday: new Date()});

}

module.exports = {
    db,
    client,
    syncAndSeed,
    Friend
}