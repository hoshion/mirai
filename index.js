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
    
    function roleDeleter(){
        message.member.removeRole("497821551014576131");
        message.member.removeRole("497821061635899402");
        message.member.removeRole("497821212894953473");
        message.member.removeRole("497821268813414400");
        message.member.removeRole("497821405618896917");
        message.member.removeRole("497843318953345024");
    }
    const memberCreate = `INSERT INTO test VALUES('${message.author.id}',1,'0',0, 'null', 'null')`;
    con.query(`SELECT xp FROM test WHERE userid='${message.author.id}'`, function(err, xp){
        if(err) throw err;
        if(xp.length == 0){
            con.query(memberCreate, function(err, result){
                if(err) console.log(err);
            })
        } else {
            con.query(`SELECT * FROM test WHERE userid = ${message.author.id}`, function(err, result){
                if(err) throw err;
                let memberXP = result[0].xp;
                if(memberXP >= 1 && memberXP < 100){
                    roleDeleter();
                }
                if(memberXP >= 100 && memberXP < 500){
                    if(message.member.roles.has("497821551014576131")) return;
                    roleDeleter();
                    message.channel.send("Вы получили первый уровень! Получите роль **Туристы**");
                    message.member.addRole("497821551014576131");
                    con.query(`UPDATE test SET lvl = 1 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 500 && memberXP < 1000){
                    if(message.member.roles.has("497821061635899402")) return;
                    roleDeleter();
                    message.channel.send("Вы получили второй уровень! Получите роль **Граждане**");
                    message.member.addRole("497821061635899402");
                    con.query(`UPDATE test SET lvl = 2 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 1000 && memberXP < 5000){
                    if(message.member.roles.has("497821212894953473")) return;
                    roleDeleter();
                    message.channel.send("Вы получили третий уровень! Получите роль **Активист**");
                    message.member.addRole("497821212894953473");
                    con.query(`UPDATE test SET lvl = 3 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 5000 && memberXP < 10000){
                    if(message.member.roles.has("497821268813414400")) return;
                    roleDeleter();
                    message.channel.send("Вы получили четвёртый уровень! Получите роль **Народный спаситель**");
                    message.member.addRole("497821268813414400");
                    con.query(`UPDATE test SET lvl = 4 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 10000 && memberXP < 25000){
                    if(message.member.roles.has("497821405618896917")) return;
                    roleDeleter();
                    message.channel.send("Вы получили пятый уровень! Получите роль **Честный политик**");
                    message.member.addRole("497821405618896917");
                    con.query(`UPDATE test SET lvl = 5 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 25000 && memberXP < 50000){
                    if(message.member.roles.has("497843318953345024")) return;
                    roleDeleter();
                    message.channel.send("Вы получили шестой уровень! Получите роль **Мэр**");
                    message.member.addRole("497843318953345024");
                    con.query(`UPDATE test SET lvl = 6 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
            });
            con.query(`UPDATE test SET xp = xp + 1 WHERE userid = ${message.author.id}`, function(err){
                if(err) throw err;
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
