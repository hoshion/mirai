const mysql = require("mysql2");
const con = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

async function SELECT(item, place, addition){
  try {
    const result = await con.promise().query(`SELECT ${item} FROM ${place} ${addition}`);
    return result
  } catch (err) {
    console.log(err);
  }
}

function INSERT(place, item){
  con.query(`INSERT INTO ${place} VALUES ${item}`);
}

function UPDATE(place, item, addition){
  con.query(`UPDATE ${place} SET ${item} ${addition}`);
}

module.exports = {
  SELECT : SELECT,
  INSERT : INSERT,
  UPDATE : UPDATE
}
