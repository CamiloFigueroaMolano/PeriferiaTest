const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    username: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
    name: {
      type: 'varchar',
    },
    lastname: {
      type: 'varchar',
    },
    birthday: {
      type: 'date',
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
});
