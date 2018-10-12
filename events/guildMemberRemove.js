exports.run = (client, member) => {
    const Discord = require("discord.js");
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    const channel = member.guild.channels.get("497837691665121290");
    channel.send(member + " покинул... Жаль.")
    console.log("Покинул " + member.user.username);
    con.query(`DELETE FROM test WHERE userid = ${member.id}`);
};
