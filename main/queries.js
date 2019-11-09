const mysql = require("mysql");
const con = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

function SELECT(item, place, addition){

  let promise = new Promise(function(resolve, reject) {
    con.query(`SELECT ${item} FROM ${place} ${addition}`, (err, result) => {
      if(err) process.env.FEEDBACKEFFOR;
      resolve(result);
    });
  });
  promise.then(result => {
    return result
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
