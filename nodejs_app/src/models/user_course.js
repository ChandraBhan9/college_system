module.exports = (sequelize, Sequelize) => {
  const UserCourse = sequelize.define(
    "user_course",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      courseId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["id"],
        },
        {
          fields: ["userId", "courseId"],
        },
      ],
    }
  );

  return UserCourse;
};
