// models/User.js

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    // Define the association with the UserProfile model
    User.associate = (models) => {
      User.hasOne(models.UserProfile, {
        foreignKey: 'userId', // Foreign key in UserProfile referencing User's id
        as: 'profile', // Alias for the association
      });
    };
  
    return User;
  };
  