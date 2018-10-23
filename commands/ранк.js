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
    
    con.query(`SELECT * FROM local WHERE userid = ${message.author.id} AND serverid = ${message.guild.id}`, function(err, result){
        /*if(args[0] == "фоны"){
            if(!args[1]) return message.channel.send("Список фонов : \n **Аниме фоны**: `anime1`, `anime2`, `anime3`, `anime4`, `anime5`, `anime6`, `anime7`, `anime8`, `anime9`, `miku1`, `dodji1`, `seiber1`, `seiber2`, `tokiogyl1`, `tokiogyl2` \n **Абстрактные фоны**: `abstract1`, `abstract2`, `abstract3`, `abstract4`, `abstract5` \n **Города**:`moscow1`, `moscow2`, `tokio1`, `tokio2`, `paris1` \n **Природа**: `sakura1`, `sakura2`, `sakura3`, `flower1`\n **Игры**: `minecraft1`, `minecraft2`, `detroit1`, `detroit2`, `detroit3`\n **Другое**: `another1`, `another2`, `another3`");
            if(args[1]){
                Jimp.read(`images/backgrounds/${args[1]}.jpg`).then(image => {
                    image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                        message.channel.send({files: [{name: `${args[1]}.jpg`, attachment: buffer}]});
                    });
                });
            }
            return;
        };
        if(args[0] == "фон"){
            if(!args[1]) return message.channel.send("Вы не ввели название фона для установки!");
            if(args[1]){
                Jimp.read(`images/backgrounds/${args[1]}.jpg`, (err, image) => {
                    if(err) return message.channel.send("Неверное название фона");
                    con.query(`UPDATE global SET profileback = '${args[1]}' WHERE userid = ${message.author.id}`)
                    return message.channel.send(`Успешно установлен фон **${args[1]}**`)
                });
            }
            return;
        }
        if(result[0].profileback == null) return message.channel.send("Вы не установили фон для профиля. \nЧтобы установить напишите `-профиль фон [название_фона]`. \nЧтобы узнать, какие фоны есть, напишите `-профиль фоны`. \nЧтобы увидеть фон, напишите `-профиль фоны [название_фона]`");*/
        Jimp.read(avatar).then(avatar => {
			new Jimp(300, 700, '#383838', function(err, image){
				Jimp.read('images/rank/greenleaves.png').then(background3 => {
					//Jimp.read(`images/backgrounds/${result[0].profileback}.jpg`).then(image => {//
						Jimp.loadFont('images/fonts/font1.fnt').then(font => {
							Jimp.loadFont('images/fonts/font2.fnt').then(font1 => {
								new Jimp(278, 389, '#383838', function(err, shadow1){
									new Jimp(278, 389, '#FFFFFF', function(err, background) {
										new Jimp(278, 278, "#000000", function(err, background2){
											if(err) console.log(err);
											avatar.resize(274,274);
											background.opacity(0.8);
											shadow1.opacity(0.9);
											background2.opacity(0.8);
											image.composite(background3, 0, 0);
											image.composite(shadow1, 16, 305);
											image.composite(background, 11, 300);
											image.composite(background2, 11, 11);
											image.composite(avatar, 13, 13);
											image.print(font, 11, 325, `${message.author.username}`);
											image.print(font, 11, 405, `Место - в разработке`)
											image.print(font, 11, 365, `XP: ${result[0].xp}`);
											image.write('rank.png');
											image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
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
