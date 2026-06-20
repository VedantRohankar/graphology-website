import db from "../config/db.js";

export const createUser = async(username,email,password)=>{
  const query=`
  INSERT INTO users (username,email,password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

const values = [username,email,password];

const result = await db.query(query,values);
return result.rows[0];

};

export const findUserEmail = async (email)=>{
  const result = await db.query(
    `SELECT * FROM users WHERE email = $1`,[email]
  );

  return result.rows[0];
};