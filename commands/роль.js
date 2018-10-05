exports.run = async (client, message, [command, mention, commandname, ...messageGive]) => {
    const Discord = require("discord.js");
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });

    const mentionRole = message.mentions.roles.first();

    if(command == "добавить"){
        await con.query(`INSERT INTO roles VALUES('${mentionRole.id}','${commandname}','${messageGive.join(" ")}')`, function(err){
            if(err) throw err;
        })
        message.channel.send("Команда успешно добавлена в базу данных!")
        console.log('Команда "роль" использована пользователем ' + message.author.username + '. Результат - успешно');
    }
}
