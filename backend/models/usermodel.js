import pool from '../config/db.js';

class Users{
    static async createAccount(){
        const insert_query=`INSERT INTO users(username,password_hash,email) VALUES ($1,$2,$3) RETURNING *`;
        const values = [username, psw, secondCred];
        const {rows} = await pool.query(insert_query,values)
    return rows[0];
    }

    static async findUserByEmail(email){
        const {rows} = await pool.query(`SELECT * FROM users WHERE email=$1`,[email])
    return rows[0]
    }

    static async findUserByUsername(username){
        const {rows} = await pool.query(`SELECT * FROM users WHERE username=$1`,[username]);
    return rows[0]
    }
}

export default Users;