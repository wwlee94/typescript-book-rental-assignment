import dotenv from 'dotenv';
import 'reflect-metadata';
import app from './App';
import databaseConn from './database/databaseConn';
dotenv.config({ path: `${__dirname}/../.env` });

// Connect typeORM mysql + server
const listen = async () => {
  await databaseConn();

  app.listen(3000, 'localhost', () => {
    console.log('Server running :)');
  });
};

listen();
