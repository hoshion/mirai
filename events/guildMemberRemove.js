exports.run = (client, member) => {
    const Discord = require("discord.js");
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    console.log("Покинул " + member.user.username)
};
