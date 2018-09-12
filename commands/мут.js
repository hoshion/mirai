exports.run = (client, message, [mention, time, ...reason]) => {
    const Discord = require("discord.js");
    const muteMember = message.mentions.members.first();

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав!");
    if(!muteMember) return message.channel.send("Вы не указали человека!");
    if(!time) return message.channel.send("Вы не указали время!");

    const timeSeconds = 1000;
    const timeMinutes = 60000;
    const timeHours = 3600000;
    const timeDays = 86400000;

    if(time.length == 2){
        const timeFull1 = time.slice(1).trim();
        const timeTime = time.slice(0,1).trim();
        if(timeFull1 == "с") {
            const muteInSeconds = timeTime * timeSeconds;
            muteMember.addRole("474161649041932288");
            message.channel.send("**" + muteMember.user.username + "** Замучен!");
            setTimeout(() => {
                muteMember.removeRole("474161649041932288");
            }, muteInSeconds);
            const mute = muteInSeconds / 1000;
            const embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Замутил человека" + muteMember.user.username + "\nНа время : " + mute + " секунд\nПо причине : " + reason.join(" "))
                .setColor("ff0000")
                .setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL);
            const channel = message.guild.channels.get("473958499496230912");
            channel.send(embed);
        }
        else if(timeFull1 == "м") {
            const muteInMinutes = timeTime * timeMinutes;
            muteMember.addRole("474161649041932288");
            message.channel.send("**" + muteMember.user.username + "** Замучен!");
            setTimeout(() => {
                muteMember.removeRole("474161649041932288");
            }, muteInMinutes);
            const mute = muteInMinutes / 1000;
            const embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Замутил человека" + muteMember.user.username + "\nНа время : " + mute + " секунд\nПо причине : " + reason.join(" "))
                .setColor("ff0000")
                .setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL);
            const channel = message.guild.channels.get("489485275903295513");
            channel.send(embed);
        }
        else if(timeFull1 == "ч") {
            const muteInHours = timeTime * timeHours;
            muteMember.addRole("474161649041932288");
            message.channel.send("**" + muteMember.user.username + "** Замучен!");
            setTimeout(() => {
                muteMember.removeRole("474161649041932288");
            }, muteInHours);
            const mute = muteInHours / 1000;
            const embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Замутил человека" + muteMember.user.username + "\nНа время : " + mute + " секунд\nПо причине : " + reason.join(" "))
                .setColor("ff0000")
                .setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL);
            const channel = message.guild.channels.get("489485275903295513");
            channel.send(embed);
        }
        else if(timeFull1 == "д") {
            const muteInDays = timeTime * timeDays;
            muteMember.addRole("474161649041932288");
            message.channel.send("**" + muteMember.user.username + "** Замучен!");
            setTimeout(() => {
                muteMember.removeRole("474161649041932288");
            }, muteInDays);
            const mute = muteInDays / 1000;
            const embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Замутил человека" + muteMember.user.username + "\nНа время : " + mute + " секунд\nПо причине : " + reason.join(" "))
                .setColor("ff0000")
                .setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL);
            const channel = message.guild.channels.get("489485275903295513");
            channel.send(embed);
        }
    }
    else if(time.length == 3){
        const timeFull1 = time.slice(2).trim();
        const timeTime = time.slice(0,2).trim();
        if(timeFull1 == "с") {
            const muteInSeconds = timeTime * timeSeconds;
            muteMember.addRole("474161649041932288");
            message.channel.send("**" + muteMember.user.username + "** Замучен!");
            setTimeout(() => {
                muteMember.removeRole("474161649041932288");
            }, muteInSeconds);
            const mute = muteInSeconds / 1000;
            const embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Замутил человека" + muteMember.user.username + "\nНа время : " + mute + " секунд\nПо причине : " + reason.join(" "))
                .setColor("ff0000")
                .setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL);
            const channel = message.guild.channels.get("489485275903295513");
            channel.send(embed);
        }
        else if(timeFull1 == "м") {
            const muteInMinutes = timeTime * timeMinutes;
            muteMember.addRole("474161649041932288");
            message.channel.send("**" + muteMember.user.username + "** Замучен!");
            setTimeout(() => {
                muteMember.removeRole("474161649041932288");
            }, muteInMinutes);
            const mute = muteInMinutes / 1000;
            const embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Замутил человека" + muteMember.user.username + "\nНа время : " + mute + " секунд\nПо причине : " + reason.join(" "))
                .setColor("ff0000")
                .setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL);
            const channel = message.guild.channels.get("489485275903295513");
            channel.send(embed);
        }
        else if(timeFull1 == "ч") {
            const muteInHours = timeTime * timeHours;
            muteMember.addRole("474161649041932288");
            message.channel.send("**" + muteMember.user.username + "** Замучен!");
            setTimeout(() => {
                muteMember.removeRole("474161649041932288");
            }, muteInHours);
            const mute = muteInHours / 1000;
            const embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Замутил человека" + muteMember.user.username + "\nНа время : " + mute + " секунд\nПо причине : " + reason.join(" "))
                .setColor("ff0000")
                .setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL);
            const channel = message.guild.channels.get("489485275903295513");
            channel.send(embed);
        }
        else if(timeFull1 == "д") {
            const muteInDays = timeTime * timeDays;
            muteMember.addRole("474161649041932288");
            message.channel.send("**" + muteMember.user.username + "** Замучен!");
            setTimeout(() => {
                muteMember.removeRole("474161649041932288");
            }, muteInDays);
            const mute = muteInDays / 1000;
            const embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Замутил человека" + muteMember.user.username + "\nНа время : " + mute + " секунд\nПо причине : " + reason.join(" "))
                .setColor("ff0000")
                .setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL);
            const channel = message.guild.channels.get("473958499496230912");
            channel.send(embed);
        }
    }
};
