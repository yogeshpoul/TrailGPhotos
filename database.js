import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})
pool.connect((err)=>{
    if(err) throw err
    console.log("connectd successfully")
})
module.exports=pool