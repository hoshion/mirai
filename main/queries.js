const mysql = require("mysql");
const con = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  port: 3306
});

function SELECT(item, place, addition){
  con.query(`SELECT ${item} FROM ${place} ${addition}`, function(err, result){
    if(err) process.env.FEEDBACKEFFOR;
    return result;
  });
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
