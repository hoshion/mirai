const mysql = require("mysql");
const con = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

function SELECT(item, place, addition){
  let result1;
  con.query(`SELECT ${item} FROM ${place} ${addition}`, (err, result) => {
    if(err) process.env.FEEDBACKEFFOR;
    result1 = result;
  });
  return result1;
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
