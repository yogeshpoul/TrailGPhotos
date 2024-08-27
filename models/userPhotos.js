// models/userPhotos.js

module.exports = (sequelize, DataTypes) => {
    const userPhotos = sequelize.define('userPhotos', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageName: {
        type: DataTypes.STRING,
        allowNull: true, // Optional, if imageName can be null
      },
      photoKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    // Define the association with the User model
    userPhotos.associate = (models) => {
      userPhotos.belongsTo(models.User, {
        foreignKey: 'userId', // Foreign key referencing User's id
        onDelete: 'CASCADE', // Delete userPhotos if the User is deleted
        onUpdate: 'CASCADE', // Update userPhotos if the User is updated
      });
    };
  
    return userPhotos;
  };