exports.run = (client, message, args) => {
    const mysql = require("mysql")
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    try {
        if(args[0].toLowerCase() == "установить"){
            con.query(`INSERT INTO local (serverid, type, channelid) VALUES('${message.guild.id}','logs', '${message.mentions.channels.first().id}')`, function(err){
            if(err) console.log(err);
            })
            message.channel.send(`Успешно установлен канал **${message.mentions.channels.first().id}** для логов!`)
        }
    } catch(err) {
        client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
    }
}
