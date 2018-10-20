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
			con.query(`SELECT * FROM global WHERE userid = ${message.author.id}`, function(err, result2){
				con.query(`UPDATE global SET lvl = ${lvl(result2[0].xp)} WHERE userid = ${message.author.id}`)
			})
			con.query(`SELECT * FROM global WHERE userid = ${message.author.id}`, function(err, result3){
				if(result[0].lvl !== result3[0].lvl) message.channel.send(`Поздравляем с **${result3[0].lvl}** уровнем, ${message.author}!`)
			})
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

function lvl(xp){
    if(xp > 104 && xp < 208 ) return 1
    if(xp > 208 && xp < 312 ) return 2
    if(xp > 312 && xp < 416 ) return 3
    if(xp > 416 && xp < 520 ) return 4
    if(xp > 520 && xp < 624 ) return 5
    if(xp > 624 && xp < 728 ) return 6
    if(xp > 728 && xp < 832 ) return 7
    if(xp > 832 && xp < 936 ) return 8
    if(xp > 936 && xp < 1040 ) return 9
    if(xp > 1040 && xp < 1144 ) return 10
    if(xp > 1144 && xp < 1248 ) return 11
    if(xp > 1248 && xp < 1352 ) return 12
    if(xp > 1352 && xp < 1456 ) return 13
    if(xp > 1456 && xp < 1560 ) return 14
    if(xp > 1560 && xp < 1664 ) return 15
    if(xp > 1664 && xp < 1768 ) return 16
    if(xp > 1768 && xp < 1872 ) return 17
    if(xp > 1872 && xp < 1976 ) return 18
    if(xp > 1976 && xp < 2080 ) return 19
    if(xp > 2080 && xp < 2184 ) return 20
    if(xp > 2184 && xp < 2288 ) return 21
    if(xp > 2288 && xp < 2392 ) return 22
    if(xp > 2392 && xp < 2496 ) return 23
    if(xp > 2496 && xp < 2600 ) return 24
    if(xp > 2600 && xp < 2704 ) return 25
    if(xp > 2704 && xp < 2808 ) return 26
    if(xp > 2808 && xp < 2912 ) return 27
    if(xp > 2912 && xp < 3016 ) return 28
    if(xp > 3016 && xp < 3120 ) return 29
    if(xp > 3120 && xp < 3224 ) return 30
    if(xp > 3224 && xp < 3328 ) return 31
    if(xp > 3328 && xp < 3432 ) return 32
    if(xp > 3432 && xp < 3536 ) return 33
    if(xp > 3536 && xp < 3640 ) return 34
    if(xp > 3640 && xp < 3744 ) return 35
    if(xp > 3744 && xp < 3848 ) return 36
    if(xp > 3848 && xp < 3952 ) return 37
    if(xp > 3952 && xp < 4056 ) return 38
    if(xp > 4056 && xp < 4160 ) return 39
    if(xp > 4160 && xp < 4264 ) return 40
    if(xp > 4264 && xp < 4368 ) return 41
    if(xp > 4368 && xp < 4472 ) return 42
    if(xp > 4472 && xp < 4576 ) return 43
    if(xp > 4576 && xp < 4680 ) return 44
    if(xp > 4680 && xp < 4784 ) return 45
    if(xp > 4784 && xp < 4888 ) return 46
    if(xp > 4888 && xp < 4992 ) return 47
    if(xp > 4992 && xp < 5096 ) return 48
    if(xp > 5096 && xp < 5200 ) return 49
    if(xp > 5200 && xp < 5304 ) return 50
    if(xp > 5304 && xp < 5408 ) return 51
    if(xp > 5408 && xp < 5512 ) return 52
    if(xp > 5512 && xp < 5616 ) return 53
    if(xp > 5616 && xp < 5720 ) return 54
    if(xp > 5720 && xp < 5824 ) return 55
    if(xp > 5824 && xp < 5928 ) return 56
    if(xp > 5928 && xp < 6032 ) return 57
    if(xp > 6032 && xp < 6136 ) return 58
    if(xp > 6136 && xp < 6240 ) return 59
    if(xp > 6240 && xp < 6344 ) return 60
    if(xp > 6344 && xp < 6448 ) return 61
    if(xp > 6448 && xp < 6552 ) return 62
    if(xp > 6552 && xp < 6656 ) return 63
    if(xp > 6656 && xp < 6760 ) return 64
    if(xp > 6760 && xp < 6864 ) return 65
    if(xp > 6864 && xp < 6968 ) return 66
    if(xp > 6968 && xp < 7072 ) return 67
    if(xp > 7072 && xp < 7176 ) return 68
    if(xp > 7176 && xp < 7280 ) return 69
    if(xp > 7280 && xp < 7384 ) return 70
    if(xp > 7384 && xp < 7488 ) return 71
    if(xp > 7488 && xp < 7592 ) return 72
    if(xp > 7592 && xp < 7696 ) return 73
    if(xp > 7696 && xp < 7800 ) return 74
    if(xp > 7800 && xp < 7904 ) return 75
    if(xp > 7904 && xp < 8008 ) return 76
    if(xp > 8008 && xp < 8112 ) return 77
    if(xp > 8112 && xp < 8216 ) return 78
    if(xp > 8216 && xp < 8320 ) return 79
    if(xp > 8320 && xp < 8424 ) return 80
    if(xp > 8424 && xp < 8528 ) return 81
    if(xp > 8528 && xp < 8632 ) return 82
    if(xp > 8632 && xp < 8736 ) return 83
    if(xp > 8736 && xp < 8840 ) return 84
    if(xp > 8840 && xp < 8944 ) return 85
    if(xp > 8944 && xp < 9048 ) return 86
    if(xp > 9048 && xp < 9152 ) return 87
    if(xp > 9152 && xp < 9256 ) return 88
    if(xp > 9256 && xp < 9360 ) return 89
    if(xp > 9360 && xp < 9464 ) return 90
	if(xp > 9464 && xp < 9568 ) return 91
    if(xp > 9568 && xp < 9672 ) return 92
    if(xp > 9672 && xp < 9776 ) return 93
    if(xp > 9776 && xp < 9880 ) return 94
    if(xp > 9880 && xp < 9984 ) return 95
    if(xp > 9984 && xp < 10088 ) return 96
    if(xp > 10088 && xp < 10192 ) return 97
    if(xp > 10192 && xp < 10296 ) return 98
}

client.login(process.env.TOKEN);
