// models/index.js
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize("postgres://default:nOYZHXFb53tI@ep-purple-rain-a4t59pyl-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require", {
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
