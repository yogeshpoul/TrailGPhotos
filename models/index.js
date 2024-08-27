// models/index.js
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize("postgresql://postgres.dijhkbzbjjwxbnjzmvnm:Yavgesh@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres", {
  dialect: 'postgres',
  // other options
});

const User = require('./user')(sequelize, DataTypes);
const userPhotos=require('./userPhotos')(sequelize,DataTypes)

const db = {
  User,
  sequelize,
  Sequelize,
  userPhotos
};

module.exports = db;
// models/index.js (Add this at the end of the file)
db.sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = db;
