//Buble db configs
import pg from 'pg'
import dotenv from 'dotenv';
dotenv.config();

const pool =new pg.Pool({
    user:'postgres',
    host:'127.0.0.1',
    database:'buble',
    password:'root',
    port:5432,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 500, 
    idleTimeoutMillis: 60000, // Close idle clients after 30s
    connectionTimeoutMillis: 5000, // Return error if connection not established in 5s
})


pool.query("SELECT TO_CHAR(NOW() AT TIME ZONE 'Asia/Kolkata','DD-MM-YYYY HH:MM:SS') AS local_time ", (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    console.log({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT,
    });

  } else {
    console.log('Connection established to the database:', res.rows);
  }
});


export default pool;
