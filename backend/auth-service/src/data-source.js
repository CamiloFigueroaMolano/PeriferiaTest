require('reflect-metadata');
const { DataSource } = require('typeorm');
const User = require('./models/user.model');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'cfadmin',        
  password: 'A1b2c3d4*',     
  database: 'BDTEST',  
  synchronize: true,           
  logging: false,
  entities: [User],
});

module.exports = { AppDataSource };
