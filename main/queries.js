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
    return [result];
    con.end();
  } catch (err) {
    console.log(err);
    con.end();
  }
}

function INSERT(place, item){
  con.query(`INSERT INTO ${place} VALUES ${item}`);
  con.end();
}

function UPDATE(place, item, addition){
  con.query(`UPDATE ${place} SET ${item} ${addition}`);
  con.end();
}

module.exports = {
  SELECT : SELECT,
  INSERT : INSERT,
  UPDATE : UPDATE
}
