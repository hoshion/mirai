exports.run = async (client, message, args) => {
    message.channel.startTyping()
    
    const Jimp = require("jimp");
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });

    const mentionMember = message.mentions.members.first();
    const tag = message.author.tag;
    const avatar = message.author.avatarURL;
	const nickargs = message.author.username.split("");
	
    con.query(`SELECT * FROM local WHERE userid = ${message.author.id} AND serverid = ${message.guild.id}`, function(err, result){
        if(args[0] == "фоны"){
            if(!args[1]) return message.channel.send("Список фонов : `autumn`, `greenleaves`");
            if(args[1]){
                Jimp.read(`images/rank/${args[1]}.png`).then(image => {
                    image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
						if(err) return message.channel.send("Неверное название фона!")
                        message.channel.send({files: [{name: `${args[1]}.jpg`, attachment: buffer}]});
                    });
                });
            }
            return;
        };
        if(args[0] == "фон"){
            if(!args[1]) return message.channel.send("Вы не ввели название фона для установки!");
            if(args[1]){
                Jimp.read(`images/rank/${args[1]}.png`, (err, image) => {
                    if(err) return message.channel.send("Неверное название фона!");
                    con.query(`UPDATE local SET profileback = '${args[1]}' WHERE userid = ${message.author.id} AND serverid = ${message.guild.id}`)
                    return message.channel.send(`Успешно установлен фон **${args[1]}**`)
                });
            }
            return;
        }
        if(result[0].profileback == null) return message.channel.send("Вы не установили фон для ранга. \nЧтобы установить напишите `-ранг фон [название_фона]`. \nЧтобы узнать, какие фоны есть, напишите `-ранг фоны`. \nЧтобы увидеть фон, напишите `-ранг фоны [название_фона]`");
        Jimp.read(avatar).then(avatar => {
				Jimp.read(`images/another/rankframe.png`).then(rankframe => {
					Jimp.read(`images/rank/${result[0].profileback}.png`).then(background3 => {
						Jimp.loadFont('images/fonts/font1.fnt').then(font => {
							Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font1 => {
								new Jimp(250, 400, '#383838', function(err, shadow1){
									new Jimp(250, 400, '#FFFFFF', function(err, background) {
										new Jimp(250, 250, "#000000", function(err, background2){
											if(err) console.log(err);
											avatar.resize(250, 250);
											background.opacity(0.8);
											shadow1.opacity(0.8);
											background2.opacity(0.8);
											background3.mask(rankframe, 0, 0);
											background3.composite(shadow1, 30, 295);
											background3.composite(background, 20, 285);
											background3.composite(background2, 30, 20);
											background3.composite(avatar, 20, 10);
											background3.print(font, 25, 305, `${lol(nickargs[0])} ${lol(nickargs[1])} ${lol(nickargs[2])} ${lol(nickargs[3])} ${lol(nickargs[4])} ${lol(nickargs[5])}`);
											background3.print(font, 25, 385, `Место: в разработке`)
											background3.print(font, 25, 345, `XP: ${result[0].xp}`);
											background3.write('rank.png');
											background3.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
												message.channel.send({files: [{name: 'rank.png', attachment: buffer}]});
											});
										});
									});
								});
							});
						});
					});
				});
		});
    });
    message.channel.stopTyping()
}
function lol(nick){
	console.log(nick)
	if(!nick) return "";
	else if(nick == "𝓥") return "В"
	else return nick 
}
