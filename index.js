const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const mysql = require("mysql")
const prefix = '-';

const con = mysql.createConnection({
    host: "db4free.net",
    user: "botdrizba",
    password: "drizba123",
    database: "drizba"
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
                  //  message.member.removeRole("468166002622988318"); // интроверт
                    message.member.removeRole("468166056968716298"); // молчаливый
                    message.member.removeRole("468166393527795742"); // умеет говорить
                    message.member.removeRole("468166107186987010"); // общительный
                    message.member.removeRole("468166387253116957"); // оратор
                    message.member.removeRole("468166629037965313"); // душа компании
                    message.member.removeRole("468167438987427840"); // экстраверт
                  //  if(message.member.roles.has("468166393527795742")) return;
                  //  message.channel.send("Это ваше первое сообщение! Вы получаете роль **Интроверт**");
                  //  message.member.addRole("468166393527795742");
                    const toNew = memberXP - 0;
                    con.query(`UPDATE test SET lvl = 0, tolvl = ${toNew} WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 100 && memberXP < 500){
                  // message.member.removeRole("468166002622988318"); // интроверт
                  //  message.member.removeRole("468166056968716298"); // молчаливый
                    message.member.removeRole("468166393527795742"); // умеет говорить
                    message.member.removeRole("468166107186987010"); // общительный
                    message.member.removeRole("468166387253116957"); // оратор
                    message.member.removeRole("468166629037965313"); // душа компании
                    message.member.removeRole("468167438987427840"); // экстраверт
                    const toNew = memberXP - 100;
                    con.query(`UPDATE test SET tolvl = ${toNew} WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                    if(message.member.roles.has("468166056968716298")) return;
                    message.channel.send("Вы получили первый уровень! Получите роль **Молчаливый**");
                    message.member.addRole("468166056968716298");
                    con.query(`UPDATE test SET lvl = 1 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 500 && memberXP < 1000){
                 //   message.member.removeRole("468166002622988318"); // интроверт
                    message.member.removeRole("468166056968716298"); // молчаливый
                 //   message.member.removeRole("468166393527795742"); // умеет говорить
                    message.member.removeRole("468166107186987010"); // общительный
                    message.member.removeRole("468166387253116957"); // оратор
                    message.member.removeRole("468166629037965313"); // душа компании
                    message.member.removeRole("468167438987427840"); // экстраверт
                    const toNew = memberXP - 500;
                    con.query(`UPDATE test SET tolvl = ${toNew} WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                    if(message.member.roles.has("468166393527795742")) return;
                    message.channel.send("Вы получили второй уровень! Получите роль **Умеет говорить**");
                    message.member.addRole("468166393527795742");
                    con.query(`UPDATE test SET lvl = 2 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 1000 && memberXP < 5000){
                 //   message.member.removeRole("468166002622988318); // интроверт
                    message.member.removeRole("468166056968716298"); // молчаливый
                    message.member.removeRole("468166393527795742"); // умеет говорить
                 //   message.member.removeRole("468166107186987010"); // общительный
                    message.member.removeRole("468166387253116957"); // оратор
                    message.member.removeRole("468166629037965313"); // душа компании
                    message.member.removeRole("468167438987427840"); // экстраверт
                    const toNew = memberXP - 1000;
                    con.query(`UPDATE test SET tolvl = ${toNew} WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                    if(message.member.roles.has("468166107186987010")) return;
                    message.channel.send("Вы получили третий уровень! Получите роль **Общительный**");
                    message.member.addRole("468166107186987010");
                    con.query(`UPDATE test SET lvl = 3 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 5000 && memberXP < 10000){
                 //   message.member.removeRole("468166002622988318"); // интроверт
                    message.member.removeRole("468166056968716298"); // молчаливый
                    message.member.removeRole("468166393527795742"); // умеет говорить
                    message.member.removeRole("468166107186987010"); // общительный
                 //   message.member.removeRole("468166387253116957"); // оратор
                    message.member.removeRole("468166629037965313"); // душа компании
                    message.member.removeRole("468167438987427840"); // экстраверт
                    const toNew = memberXP - 5000;
                    con.query(`UPDATE test SET tolvl = ${toNew} WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                    if(message.member.roles.has("468166387253116957")) return;
                    message.channel.send("Вы получили четвёртый уровень! Получите роль **Оратор**");
                    message.member.addRole("468166387253116957");
                    con.query(`UPDATE test SET lvl = 4 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 10000 && memberXP < 25000){
                 //   message.member.removeRole("468166002622988318); // интроверт
                    message.member.removeRole("468166056968716298"); // молчаливый
                    message.member.removeRole("468166393527795742"); // умеет говорить
                    message.member.removeRole("468166107186987010"); // общительный
                    message.member.removeRole("468166387253116957"); // оратор
                 //   message.member.removeRole("468166629037965313"); // душа компании
                    message.member.removeRole("468167438987427840"); // экстраверт
                    const toNew = memberXP - 10000;
                    con.query(`UPDATE test SET tolvl = ${toNew} WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                    if(message.member.roles.has("468166629037965313")) return;
                    message.channel.send("Вы получили пятый уровень! Получите роль **Душа компании**");
                    message.member.addRole("468166629037965313");
                    con.query(`UPDATE test SET lvl = 5 WHERE userid = ${message.author.id}`, function(err){
                        if(err) throw err;
                    });
                }
                if(memberXP >= 25000 && memberXP < 50000){
                 //   message.member.removeRole("468166002622988318"); // интроверт
                    message.member.removeRole("468166056968716298"); // молчаливый
                    message.member.removeRole("468166393527795742"); // умеет говорить
                    message.member.removeRole("468166107186987010"); // общительный
                    message.member.removeRole("468166387253116957"); // оратор
                    message.member.removeRole("468166629037965313"); // душа компании
                 //   message.member.removeRole("468167438987427840"); // экстраверт
                    if(message.member.roles.has("468167438987427840")) return;
                    message.channel.send("Вы получили шестой уровень! Получите роль **Экстраверт**");
                    message.member.addRole("468167438987427840");
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
                message.channel.send("Команды не существует бляха муха!")
            }
        })
    };
});

client.login("NDQ3MTMzNzM4OTAwNTIwOTYw.DmIB1A.pZvt9E3HX7Z-2ZNVOhsQOjIW4D0");
