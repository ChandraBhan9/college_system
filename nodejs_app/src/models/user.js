module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(32),
      },
      email: {
        type: Sequelize.STRING(64),
      },
      phone: {
        type: Sequelize.STRING(15),
      },
      address: {
        type: Sequelize.JSON,
      },
      enable: {
        type: Sequelize.BOOLEAN,
      },
      password: {
        type: Sequelize.STRING(64),
      },
    },
    {
      // defaultScope: {
      //   attributes: {
      //     exclude: ["password"],
      //   },
      // },
      indexes: [
        {
          unique: true,
          fields: ["id", "email", "phone"],
        },
        {
          fields: ["email", "phone"],
        },
      ],
    }
  );

  return User;
};
