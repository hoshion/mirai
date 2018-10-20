const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const mysql = require("mysql")
const prefix = '-';

const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});
con.connect(function(err) {
    if (err) throw err;
    console.log("База данных успешно подключена");
  });

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args))
    });
});

client.on('message', (message) => {
    if(message.author.bot) return;
    
    con.query(`SELECT * FROM global WHERE userid = ${message.author.id}`, function(err, result){
        if(err) console.log(err);
        if(!result[0]){
            con.query(`INSERT INTO global (userid) VALUES('${message.author.id}')`)
        } else {
            con.query(`UPDATE global SET xp = xp + 3 WHERE userid = ${message.author.id}`)
        }
    })
    con.query(`SELECT * FROM local WHERE userid='${message.author.id}' AND serverid = '${message.guild.id}'`, function(err, result){
        if(err) throw err;
        if(!result[0]){
            con.query(`INSERT INTO local (serverid, type, userid) VALUES('${message.guild.id}', 'member', '${message.author.id}')`, function(err, result){
                if(err) console.log(err);
            })
        } else {
            con.query(`UPDATE local SET xp = xp + 3 WHERE userid = ${message.author.id} AND serverid = ${message.guild.id} AND type = 'member'`, function(err){
                if(err) console.log(err);
            });
        };
    });

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(message.content.indexOf(prefix) !== 0) return;
    if(!command) return message.channel.send("Вы не ввели команду!");
    if(message.content == "-_-") return;
    if(message.content == "--") return message.channel.send("Успешнаааааааа");

    try {
        const commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        con.query(`SELECT * FROM roles WHERE commandname = '${command}'`, function(err, result){
            if(err) console.log("АЩИБКА - " + err);
            if(result.length == 1){
            message.member.addRole(result[0].roleid);
            message.channel.send(message.author + result[0].message);
            } else {
                message.channel.send("Команды не существует!")
            }
        })
    };
});

client.login(process.env.TOKEN);
