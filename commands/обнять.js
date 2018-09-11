exports.run = (client, message, args) => {
    const Discord = require("discord.js");
    const fs = require("fs");
    const mentionMember = message.mentions.members.first();
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: "db4free.net",
        user: "botdrizba",
        password: "drizba123",
        database: "drizba"
    });

    if(mentionMember){
        con.query(`SELECT id,hug FROM hug ORDER BY hug.id DESC`, function(err, result){
            if(err) throw err;
            const lastID = result[0].id;
            const random = Math.floor(Math.random() * lastID) + 1;
            con.query(`SELECT hug FROM hug WHERE id=${random}`, function(err, result){
                if(err) throw err;
                const embed = new Discord.RichEmbed().setDescription(message.author + " обнял(а) " + mentionMember).setImage(result[0].hug).setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL).setColor("ffda8b");
                message.channel.send(embed)
                console.log('Команда "обнять" использована пользователем ' + message.author.username + '. Результат - успешно');
            })
        })
    }
    if(!mentionMember){
        con.query(`SELECT id,hug FROM hug ORDER BY hug.id DESC`, function(err, result){
            if(err) console.log(err);
            const lastID = result[0].id;
            const random = Math.floor(Math.random() * lastID) + 1;
            con.query(`SELECT hug FROM hug WHERE id=${random}`, function(err, result){
                if(err) console.log(err);
                const embed = new Discord.RichEmbed().setDescription(message.author + " обнял(а)... Самого себя?").setImage(result[0].hug).setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL).setColor("ffda8b");
                message.channel.send(embed)
                console.log('Команда "обнять" использована пользователем ' + message.author.username + '. Результат - успешно');
            })
        })
    }
}