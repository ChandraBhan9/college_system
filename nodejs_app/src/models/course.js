module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define(
    "course",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: Sequelize.STRING(32),
      },
      name: {
        type: Sequelize.STRING(32),
      },
      noOfSeatsAvailable: {
        type: Sequelize.INTEGER,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["id", "uuid"],
        },
        {
          fields: ["uuid", "name"],
        },
      ],
    }
  );

  return Course;
};
