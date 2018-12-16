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
	try {
		const mentionMember = message.mentions.members.first();
		const tag = message.author.tag;
		const avatar = message.author.avatarURL;

		con.query(`SELECT * FROM global WHERE userid = ${message.author.id}`, function(err, result){
			if(err) return client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
			if(args[0] == "фоны"){
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
			if(result[0].profileback == null) return message.channel.send("Вы не установили фон для профиля. \nЧтобы установить напишите `-профиль фон [название_фона]`. \nЧтобы узнать, какие фоны есть, напишите `-профиль фоны`. \nЧтобы увидеть фон, напишите `-профиль фоны [название_фона]`");
			Jimp.read(avatar).then(avatar => {
				Jimp.read(`images/backgrounds/${result[0].profileback}.jpg`).then(image => {
					Jimp.loadFont('images/fonts/font1.fnt').then(font => {
						Jimp.loadFont('images/fonts/font2.fnt').then(font1 => {
							new Jimp(775, 100, '#FFFFFF', function(err, background) {
								Jimp.read('images/another/frame.png').then(frame => {
									new Jimp(150, 150, "#FFFFFF", function(err, background2){    
										new Jimp(610,16, "#999999", function(err, lvl){
											const number = count(result[0].lvl) / 100; // Количество очков на 1 процент длины
											const xpnumber = tolvl(result[0].xp, result[0].lvl) / number;
											const length = xpnumber * 6.1;
											new Jimp(length, 16, "#43A740", function(err, xpneed){
												if(err) console.log(err);
												avatar.resize(150,150);
												background.opacity(0.8);
												background2.opacity(0.8);
												lvl.opacity(0.8);
												image.composite(background, 180, 50);
												image.composite(background2, 25, 25);
												image.composite(avatar, 25, 25);
												image.composite(frame,0,0);
												image.composite(lvl,185,130);
												image.composite(xpneed,185,130);
												image.print(font, 185, 55,`${tag}`);                                            
												image.print(font1, 185, 89,`XP: ${result[0].xp}`);
												image.print(font1, 305, 89,`LVL: ${result[0].lvl}`);
												image.write('test1.png');
												image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
													message.channel.send({files: [{name: 'test1.png', attachment: buffer}]});
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
		});
	}catch(err){
		client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
	}
    message.channel.stopTyping()
}
function tolvl(xp, lvl){
	if(lvl == 0) return xp - 0
	if(lvl == 1) return xp - 104
    if(lvl == 2) return xp - 312
	if(lvl == 3) return xp - 624
	if(lvl == 4) return xp - 1040
	if(lvl == 5) return xp - 1560
	if(lvl == 6) return xp - 2184
	if(lvl == 7) return xp - 2912
	if(lvl == 8) return xp - 3744
	if(lvl == 9) return xp - 4680
	if(lvl == 10) return xp - 5720
	if(lvl == 11) return xp - 6864
	if(lvl == 12) return xp - 8112
	if(lvl == 13) return xp - 9464
	if(lvl == 14) return xp - 10920
	if(lvl == 15) return xp - 12480
	if(lvl == 16) return xp - 14144
	if(lvl == 17) return xp - 15920
	if(lvl == 18) return xp - 17784
	if(lvl == 19) return xp - 19760
	if(lvl == 20) return xp - 21840
	if(lvl == 21) return xp - 24042
	if(lvl == 22) return xp - 26312
	if(lvl == 23) return xp - 28704
	if(lvl == 24) return xp - 31200
	if(lvl == 25) return xp - 33800
	if(lvl == 26) return xp - 36504
	if(lvl == 27) return xp - 39312
	if(lvl == 28) return xp - 42224
	if(lvl == 29) return xp - 45240
	if(lvl == 30) return xp - 48360
	if(lvl == 8) return xp - 51584
	if(lvl == 8) return xp - 54912
	if(lvl == 8) return xp - 58344
	if(lvl == 8) return xp - 61880
	if(lvl == 8) return xp - 65520
	if(lvl == 8) return xp - 69264
	if(lvl == 8) return xp - 73112
	if(lvl == 8) return xp - 77064
	if(lvl == 8) return xp - 81120
	if(lvl == 8) return xp - 85280
	if(lvl == 8) return xp - 89544
	if(lvl == 8) return xp - 93920
	if(lvl == 8) return xp - 98392
	if(lvl == 8) return xp - 102968
	if(lvl == 8) return xp - 107648
	if(lvl == 8) return xp - 112432
	if(lvl == 8) return xp - 117320
	if(lvl == 8) return xp - 122312
	if(lvl == 8) return xp - 127408
	if(lvl == 8) return xp - 132608
	if(lvl == 8) return xp - 137912
	if(lvl == 8) return xp - 143320
	if(lvl == 8) return xp - 148832
	if(lvl == 8) return xp - 154448
	if(lvl == 8) return xp - 160168
	if(lvl == 8) return xp - 165992
	if(lvl == 8) return xp - 171920
	if(lvl == 8) return xp - 177952
	if(lvl == 8) return xp - 184088
	if(lvl == 8) return xp - 190328
	if(lvl == 8) return xp - 196568
	if(lvl == 8) return xp - 202912
	if(lvl == 8) return xp - 209360
	if(lvl == 8) return xp - 215912
	if(lvl == 8) return xp - 222568
	if(lvl == 8) return xp - 229328
	if(lvl == 8) return xp - 236192
	if(lvl == 8) return xp - 243160
	if(lvl == 8) return xp - 250232
	if(lvl == 8) return xp - 257408
	if(lvl == 8) return xp - 264688
	if(lvl == 8) return xp - 272072
	if(lvl == 8) return xp - 279560
	if(lvl == 8) return xp - 287152
	if(lvl == 8) return xp - 294848
	if(lvl == 8) return xp - 302648
	if(lvl == 8) return xp - 310552
	if(lvl == 8) return xp - 318560
	if(lvl == 8) return xp - 326672
	if(lvl == 8) return xp - 334888
	if(lvl == 8) return xp - 343208
	if(lvl == 8) return xp - 351528
	if(lvl == 8) return xp - 359952
	if(lvl == 8) return xp - 368480
	if(lvl == 8) return xp - 377112
	if(lvl == 8) return xp - 385848
	if(lvl == 8) return xp - 394688
	if(lvl == 8) return xp - 403632
	if(lvl == 8) return xp - 412680
	if(lvl == 8) return xp - 421832
	if(lvl == 8) return xp - 431088
	if(lvl == 8) return xp - 440448
	if(lvl == 8) return xp - 449912
	if(lvl == 8) return xp - 459480
	if(lvl == 8) return xp - 469152
	if(lvl == 8) return xp - 478928
	if(lvl == 8) return xp - 488808
	if(lvl == 8) return xp - 498792
	if(lvl == 8) return xp - 508880
	if(lvl == 8) return xp - 519072
	if(lvl == 8) return xp - 529368
}
function count(lvl){
	if(lvl == 0) return 104
	if(lvl == 1) return 208
	if(lvl == 2) return 312
	if(lvl == 3) return 416
	if(lvl == 4) return 520
	if(lvl == 5) return 624
	if(lvl == 6) return 728
	if(lvl == 7) return 832
	if(lvl == 8) return 936
	if(lvl == 9) return 1040
	if(lvl == 10) return 1144
	if(lvl == 11) return 1248
	if(lvl == 12) return 1352
	if(lvl == 13) return 1456
	if(lvl == 14) return 1560
	if(lvl == 15) return 1664
	if(lvl == 16) return 1768
	if(lvl == 17) return 1872
	if(lvl == 18) return 1976
	if(lvl == 19) return 2080
	if(lvl == 20) return 2184
	if(lvl == 21) return 2288
	if(lvl == 22) return 2392
	if(lvl == 23) return 2496
	if(lvl == 24) return 2600
	if(lvl == 25) return 2704
	if(lvl == 26) return 2808
	if(lvl == 27) return 2912
	if(lvl == 28) return 3016
	if(lvl == 29) return 3120
	if(lvl == 30) return 3224
	if(lvl == 8) return 3328
	if(lvl == 8) return 3432
	if(lvl == 8) return 3536
	if(lvl == 8) return 3640
	if(lvl == 8) return 3744
	if(lvl == 8) return 3848
	if(lvl == 8) return 3952
	if(lvl == 8) return 4056
	if(lvl == 8) return 4160
	if(lvl == 8) return 4264
	if(lvl == 8) return 4368
	if(lvl == 8) return 4472
	if(lvl == 8) return 4576
	if(lvl == 8) return 4680
	if(lvl == 8) return 4784
	if(lvl == 8) return 4888
	if(lvl == 8) return 4992
	if(lvl == 8) return 5096
	if(lvl == 8) return 5200 
	if(lvl == 8) return 5304
	if(lvl == 8) return 5408
	if(lvl == 8) return 5512
	if(lvl == 8) return 5616
	if(lvl == 8) return 5720
	if(lvl == 8) return 5824
	if(lvl == 8) return 5928
	if(lvl == 8) return 6032
	if(lvl == 8) return 6136
	if(lvl == 8) return 6240
	if(lvl == 8) return 6344
	if(lvl == 8) return 6448
	if(lvl == 8) return 6552
	if(lvl == 8) return 6656
	if(lvl == 8) return 6760
	if(lvl == 8) return 6864
	if(lvl == 8) return 6968
	if(lvl == 8) return 7072
	if(lvl == 8) return 7176
	if(lvl == 8) return 7280
	if(lvl == 8) return 7384
	if(lvl == 8) return 7488
	if(lvl == 8) return 7592
	if(lvl == 8) return 7696
	if(lvl == 8) return 7800
	if(lvl == 8) return 7904
	if(lvl == 8) return 8008
	if(lvl == 8) return 8112
	if(lvl == 8) return 8216
	if(lvl == 8) return 8320
	if(lvl == 8) return 8424
	if(lvl == 8) return 8528
	if(lvl == 8) return 8632
	if(lvl == 8) return 8736
	if(lvl == 8) return 8840
	if(lvl == 8) return 8944
	if(lvl == 8) return 9048
	if(lvl == 8) return 9152
	if(lvl == 8) return 9256
	if(lvl == 8) return 9360
	if(lvl == 8) return 9464
	if(lvl == 8) return 9568
	if(lvl == 8) return 9672
	if(lvl == 8) return 9776
	if(lvl == 8) return 9880
	if(lvl == 8) return 9984
	if(lvl == 8) return 10088
	if(lvl == 8) return 10192
	if(lvl == 8) return 10296

}
