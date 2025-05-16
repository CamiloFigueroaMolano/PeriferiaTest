const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Like',
  tableName: 'likes',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    postId: {
      type: 'int',
    },
    userId: {
      type: 'int',
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    }
  }
});
