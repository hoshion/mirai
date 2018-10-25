exports.run = (client, message) => {
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: "db4free.net",
        user: "botdrizba",
        password: "drizba123",
        database: "drizba"
    });
    let number = con.query(`SELECT * FROM local WHERE serverid = ${message.guild.id} AND type = 'member' ORDER by local.xp DESC`, function(err, result){
        if(err) throw err;
        if(message.author.id == result[0].userid){
            number = 1;
        }
        if(message.author.id == result[1].userid){
            number = 2;
        }
        if(message.author.id == result[2].userid){
            number = 3;
        }
        if(message.author.id == result[3].userid){
            number = 4;
        }
        if(message.author.id == result[4].userid){
            number = 5;
        }
        if(message.author.id == result[5].userid){
            number = 6;
        }
        if(message.author.id == result[6].userid){
            number = 7;
        }
        if(message.author.id == result[7].userid){
            number = 8;
        }
        if(message.author.id == result[8].userid){
            number = 9;
        }
        if(message.author.id == result[9].userid){
            number = 10;
        }
    })
    let XP = con.query(`SELECT * FROM local WHERE userid = ${message.author.id} AND serverid = ${message.guild.id} AND type = 'member'`, function(err, result){
        if(err) throw err;
        XP = result[0].xp;
    })

    con.query(`SELECT userid, xp FROM local WHERE serverid = ${message.guild.id} AND type = 'member' ORDER by local.xp DESC`, function(err, top){
        if(err) throw err;
        message.channel.send("**```ini\n[1 место] - " + message.guild.members.get(top[0].userid).user.username + "\n    XP ; " + top[0].xp + 
        "\n[2 место] - " + message.guild.members.get(top[1].userid).user.username + "\n    XP ; " + top[1].xp + 
        "\n[3 место] - " + message.guild.members.get(top[2].userid).user.username + "\n    XP ; " + top[2].xp + 
        "\n[4 место] - " + message.guild.members.get(top[3].userid).user.username + "\n    XP ; " + top[3].xp + 
        "\n[5 место] - " + message.guild.members.get(top[4].userid).user.username + "\n    XP ; " + top[4].xp + 
        "\n[6 место] - " + message.guild.members.get(top[5].userid).user.username + "\n    XP ; " + top[5].xp + 
        "\n[7 место] - " + message.guild.members.get(top[6].userid).user.username + "\n    XP ; " + top[6].xp + 
        "\n[8 место] - " + message.guild.members.get(top[7].userid).user.username + "\n    XP ; " + top[7].xp + 
        "\n[9 место] - " + message.guild.members.get(top[8].userid).user.username + "\n    XP ; " + top[8].xp + 
        "\n[10 место] - " + message.guild.members.get(top[9].userid).user.username + "\n    XP ; " + top[9].xp + 
        "\n\n Ваше место - [" + number + "] Ваше XP - [" + (XP + 1) + "]```**").catch(err => {
            if(err) message.channel.send("Ошибка")
        })
    });
};
