exports.run = (client, message) => {
    const Discord = require("discord.js")
    const mysql = require("mysql")
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });

    con.query(`SELECT * FROM local WHERE serverid = ${message.guild.id} AND type = 'logs'`, function(err, result){
        if(!result[0]) {
        return
        } else {
            const embed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription("Удалил сообщение\nВ канале : " + message.channel 
                + "\nСодержание сообщения : " + message.toString() 
                + "\nВремя создания : " + message.createdAt.getHours()
                + ":" + message.createdAt.getMinutes() 
                + ":" + message.createdAt.getSeconds()
                + ", " + message.createdAt.getDate()
                + ".0" + message.createdAt.getMonth()
                + "." + message.createdAt.getFullYear())
            .setColor("ffda8b")
            .setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL);
            message.guild.channels.get(result[0].channelid).send(embed);
        }    
    })
};
