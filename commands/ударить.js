exports.run = (client, message, args) => {
    const Discord = require("discord.js");
    const mentionMember = message.mentions.members.first();
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: "db4free.net",
        user: "botdrizba",
        password: "drizba123",
        database: "drizba"
    });

    if(mentionMember){
        con.query(`SELECT id,image FROM kiss ORDER BY kiss.id DESC`, function(err, result){
            if(err) throw err;
            const lastID = result[0].id;
            const random = Math.floor(Math.random() * lastID) + 1;
            con.query(`SELECT image FROM kiss WHERE id=${random}`, function(err, result){
                if(err) throw err;
                const embed = new Discord.RichEmbed().setDescription(message.author + " поцеловал(а) " + mentionMember).setImage(result[0].image).setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL).setColor("ffda8b");
                message.channel.send(embed)
                console.log('Команда "ударить" использована пользователем ' + message.author.username + '. Результат - успешно');
            })
        })
    }
    if(!mentionMember){
        con.query(`SELECT id,image FROM kiss ORDER BY kiss.id DESC`, function(err, result){
            if(err) throw err;
            const lastID = result[0].id;
            const random = Math.floor(Math.random() * lastID) + 1;
            con.query(`SELECT image FROM kiss WHERE id=${random}`, function(err, result){
                if(err) throw err;
                const embed = new Discord.RichEmbed().setDescription(message.author + " поцеловал(а)... Самого себя?").setImage(result[0].image).setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL).setColor("ffda8b");
                message.channel.send(embed)
                console.log('Команда "ударить" использована пользователем ' + message.author.username + '. Результат - успешно');
            })
        })
    }
}