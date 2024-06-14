import mysql, {Pool, PoolOptions} from 'mysql2/promise';

const dbConfig: PoolOptions = {
    host:'localhost',
    user:'root',
    password:'',
    database:'todolist',
    port:3306
}
const db : Pool = mysql.createPool(dbConfig);
export default db;
