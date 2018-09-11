exports.run = async (client, message, [command, mention, commandname, ...messageGive]) => {
    const Discord = require("discord.js");
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: "db4free.net",
        user: "botdrizba",
        password: "drizba123",
        database: "drizba"
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