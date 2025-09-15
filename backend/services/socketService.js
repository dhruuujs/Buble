import pool from '../config/db.js'

const socketService={
    /**
    * Saves a message to the database.
    * @param {Object} msg - The message object to save.
    * @returns {Object} The saved message data, including a new ID.
    **/

    saveMessage: async(msg)=>{
        try{
            const query =`INSERT INTO messages(sender,name,text,timestamp) VALUES ($1,$2,$3,$4) RETURNING *;`;
            const values=[msg.sender,msg.name,msg.txt,msg.timestamp];
            const results = await pool.query(query,values);
            return results.rows[0];                 
        }catch(err){
            console.log("Error saving message:",err)
            throw new Error("Failed to save message.")
        }
    },


    savePrivateMessage: async(data)=>{
        try{
            const {sender,recipient,message} = data;
            const query =`INSERT INTO private_messages(sender,recipient,text,timestamp) VALUES ($$2,$3)`;
            const values =[sender,recipient,message];
            const result = await pool.query(query,values);
            return result.rows[0];
        }catch(err){
            console.log("Failed to save private message:",err);
            throw new Error("Failed to save your message.");
        }
    },
};

export default socketService;