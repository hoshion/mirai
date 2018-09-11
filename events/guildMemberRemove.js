exports.run = (client, member) => {
    const Discord = require("discord.js");
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: "db4free.net",
        user: "botdrizba",
        password: "drizba123",
        database: "drizba"
    });
    console.log("Покинул " + member.user.username);
    con.query(`DELETE FROM test WHERE userid = ${member.id}`);
};