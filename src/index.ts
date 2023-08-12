import 'reflect-metadata';
import { Database } from './main/database/database.connection';
import { Server } from './main/server/express.server';
import { RedisDatabase } from './main/database/redis.connection';

// Database.connect().then(()=>{
//     console.log('Database is connected');
//     Server.listen();
// })

Promise.all([Database.connect(), RedisDatabase.connect()]).then(() => {  
    Server.listen();
})