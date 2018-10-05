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

    const memberCreate = `INSERT INTO test VALUES('${message.author.id}',1,'0',0, 100, 'null', 'null')`;
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
                    message.member.removeRole("490424278022619137"); // маленькое зёрнышко
                    message.member.removeRole("490432511453954065"); // низкая трава
                    message.member.removeRole("490424280077697044"); // пахнущий цветок
                    message.member.removeRole("490424279230578689"); // ягодный куст
                    message.member.removeRole("490424278584655873"); // высокое дерево
                    message.member.removeRole("490424277108260864"); // 300-летний дуб
                    const toNew = memberXP - 0;
                    con.query(`UPDATE test SET lvl = 0, tolvl = ${toNew} WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 100 && memberXP < 500){
                    message.member.removeRole("490432511453954065"); // низкая трава
                    message.member.removeRole("490424280077697044"); // пахнущий цветок
                    message.member.removeRole("490424279230578689"); // ягодный куст
                    message.member.removeRole("490424278584655873"); // высокое дерево
                    message.member.removeRole("490424277108260864"); // 300-летний дуб
                    const toNew = memberXP - 100;
                    con.query(`UPDATE test SET tolvl = ${toNew} WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                    if(message.member.roles.has("490424278022619137")) return;
                    message.channel.send("Вы получили первый уровень! Получите роль **Маленькое зёрнышко**");
                    message.member.addRole("490424278022619137");
                    con.query(`UPDATE test SET lvl = 1 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 500 && memberXP < 1000){
                    message.member.removeRole("490424278022619137"); // маленькое зёрнышко
                    message.member.removeRole("490424280077697044"); // пахнущий цветок
                    message.member.removeRole("490424279230578689"); // ягодный куст
                    message.member.removeRole("490424278584655873"); // высокое дерево
                    message.member.removeRole("490424277108260864"); // 300-летний дуб
                    const toNew = memberXP - 500;
                    con.query(`UPDATE test SET tolvl = ${toNew} WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                    if(message.member.roles.has("490432511453954065")) return;
                    message.channel.send("Вы получили второй уровень! Получите роль **Низкая трава**");
                    message.member.addRole("490432511453954065");
                    con.query(`UPDATE test SET lvl = 2 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 1000 && memberXP < 5000){
                    message.member.removeRole("490424278022619137"); // маленькое зёрнышко
                    message.member.removeRole("490432511453954065"); // низкая трава
                    message.member.removeRole("490424279230578689"); // ягодный куст
                    message.member.removeRole("490424278584655873"); // высокое дерево
                    message.member.removeRole("490424277108260864"); // 300-летний дуб
                    const toNew = memberXP - 1000;
                    con.query(`UPDATE test SET tolvl = ${toNew} WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                    if(message.member.roles.has("490424280077697044")) return;
                    message.channel.send("Вы получили третий уровень! Получите роль **Пахнущий цветок**");
                    message.member.addRole("490424280077697044");
                    con.query(`UPDATE test SET lvl = 3 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 5000 && memberXP < 10000){
                    message.member.removeRole("490424278022619137"); // маленькое зёрнышко
                    message.member.removeRole("490432511453954065"); // низкая трава
                    message.member.removeRole("490424280077697044"); // пахнущий цветок
                    message.member.removeRole("490424278584655873"); // высокое дерево
                    message.member.removeRole("490424277108260864"); // 300-летний дуб
                    const toNew = memberXP - 5000;
                    con.query(`UPDATE test SET tolvl = ${toNew} WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                    if(message.member.roles.has("490424279230578689")) return;
                    message.channel.send("Вы получили четвёртый уровень! Получите роль **Ягодный куст**");
                    message.member.addRole("490424279230578689");
                    con.query(`UPDATE test SET lvl = 4 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 10000 && memberXP < 25000){
                    message.member.removeRole("490424278022619137"); // маленькое зёрнышко
                    message.member.removeRole("490432511453954065"); // низкая трава
                    message.member.removeRole("490424280077697044"); // пахнущий цветок
                    message.member.removeRole("490424279230578689"); // ягодный куст
                    message.member.removeRole("490424277108260864"); // 300-летний дуб
                    const toNew = memberXP - 10000;
                    con.query(`UPDATE test SET tolvl = ${toNew} WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                    if(message.member.roles.has("490424278584655873")) return;
                    message.channel.send("Вы получили пятый уровень! Получите роль **Высокое дерево**");
                    message.member.addRole("490424278584655873");
                    con.query(`UPDATE test SET lvl = 5 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 25000 && memberXP < 50000){
                    message.member.removeRole("490424278022619137"); // маленькое зёрнышко
                    message.member.removeRole("490432511453954065"); // низкая трава
                    message.member.removeRole("490424280077697044"); // пахнущий цветок
                    message.member.removeRole("490424279230578689"); // ягодный куст
                    message.member.removeRole("490424278584655873"); // высокое дерево
                    if(message.member.roles.has("490424277108260864")) return;
                    message.channel.send("Вы получили шестой уровень! Получите роль **300-летний дуб**");
                    message.member.addRole("490424277108260864");
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
