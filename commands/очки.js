exports.run = (client, message, [second_command, mention, xp_count]) => {
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });

    const memberMention = message.mentions.members.first();

    if(second_command == "добавить"){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав!");
        if(!memberMention) return message.channel.send("Вы не указали человека!");
        if(!xp_count) return message.channel.send("Вы не указали количество очков!");
        
        con.query(`SELECT * FROM test WHERE userid = ${memberMention.user.id}`, function(err, xp){
            if(err) throw err;
            if(xp.length == 0){
                con.query(`INSERT INTO test VALUES('${memberMention.id}',${xp_count},'0',0)`)
                message.channel.send(`Очки пользователя ${memberMention} успешно увеличены до **${xp_count}**`)
            } else {
                const newXP = parseInt(xp_count) + xp[0].xp;
                con.query(`UPDATE test SET xp = ${newXP} WHERE userid = ${memberMention.user.id}`, function(err){
                    if(err) throw err;
                    message.channel.send(`Очки пользователя ${memberMention} успешно увеличены с **${xp[0].xp}** до **${newXP}**`);
                })
            }
        })
    } else if(second_command == "удалить"){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав!");
        if(!memberMention) return message.channel.send("Вы не указали человека!");
        if(!xp_count) return message.channel.send("Вы не указали количество очков!");
        
        con.query(`SELECT * FROM test WHERE userid = ${memberMention.user.id}`, function(err, xp){
            if(err) throw err;
            if(xp.length == 0){
                con.query(`INSERT INTO test VALUES('${memberMention.id}',${xp_count},'0',0)`)
                message.channel.send(`Очки пользователя ${memberMention} успешно уменьшены до **${xp_count}**`)
            } else {
                const newXP = xp[0].xp - xp_count;
                con.query(`UPDATE test SET xp = ${newXP} WHERE userid = ${memberMention.user.id}`, function(err){
                    if(err) throw err;
                    message.channel.send(`Очки пользователя ${memberMention} успешно уменьшены с **${xp[0].xp}** до **${newXP}**`);
                })
            }
        })
    } else return message.channel.send("Не понятный аргумент");
    console.log('Команда "очки" использована пользователем ' + message.author.username + '. Результат - успешно');
};
