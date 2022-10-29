module.exports = (sequelize, Sequelize) => {
  const UserRole = sequelize.define(
    "user_role",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: Sequelize.STRING(32),
      },
      userId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["id", "userId"],
        },
        {
          fields: ["userId", "role"],
        },
      ],
    }
  );

  return UserRole;
};
