require('reflect-metadata');
const { DataSource } = require('typeorm');
const Post = require('./models/post.model');
const Like = require('./models/like.model'); // <--- Importa tu modelo de Like

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'cfadmin',
  password: 'A1b2c3d4*',
  database: 'BDTEST',
  synchronize: true,
  logging: false,
  entities: [Post, Like], // <--- Agrega aquí el modelo de Like
});

module.exports = { AppDataSource };
