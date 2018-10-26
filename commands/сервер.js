const Discord = require ('discord.js');
const bot = new Discord.Client();
const mysql = require("mysql")
    
const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAM
});

if(args[0].toLowerCase() == "сервер"){
    con.query('SELECT * FROM userData WHERE userId', function(err, result){
        if(err) console.log(err);
    })
    let embed = new Discord.RichEmbed() 
       .setColor(0xffffff)
       .setTitle('Серверинфо')
       .setDescription('Данные:')
       .addField('id', msg.guild.id, true)
       .addField('Владелец', msg.guild.owner, true)
       .addField('id владельца', msg.guild.ownerID, true)
       .addField('Роли', msg.guild.roles.size, true)
       .addField('Регион', msg.guild.region, true)
       .setThumbnail(msg.guild.iconURL)
    msg.channel.send(embed)
}
const token = config.token;
bot.login(token)
