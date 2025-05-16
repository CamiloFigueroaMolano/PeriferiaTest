const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Post',
  tableName: 'posts',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    content: {
      type: 'text',
    },
    userId: {
      type: 'int',
    },
    userName: {
      type: 'varchar',
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    }
  }
  // Eliminar la sección 'relations' completamente
});