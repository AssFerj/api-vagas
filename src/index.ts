import 'reflect-metadata';
import { Database } from './main/database/database.connection';

Database.connect().then(()=>{
    console.log('Database is connected');
})
