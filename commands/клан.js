exports.run = async (client, message, args) => {
    try {
        if(args[0] == "создать"){
            if(!message.member.roles.has("468167438987427840")) return message.channel.send("Вы не имеете роли " + message.guild.roles.get("468167438987427840"));
            if(!args[1]) return message.channel.send("Вы не ввели название клана!");

            const catChannel = await message.guild.createChannel(`Клан "${args[1]}"`, "category");
            const textChannel = await message.guild.createChannel(`текстовый-чат-${args[1]}`, "text");
            const voiceChannel = await message.guild.createChannel(`Голосовой чат "${args[1]}"`, "voice");
            await textChannel.setParent(catChannel.id);
            await voiceChannel.setParent(catChannel.id);

            await message.guild.createRole({
                name:  'Глава клана "' + args[1] + '"',
                position: 57,
                hoist: true,
            })
            .then((role) => {
                message.member.addRole(role)
                catChannel.overwritePermissions(role, {
                    VIEW_CHANNEL:true,
                })
            });

            await message.guild.createRole({
                name: 'Участники клана "' + args[1] + '"',
                position: 57,
                hoist: true,
            })
            .then((role) => {
                catChannel.overwritePermissions(role, {
                    VIEW_CHANNEL:true,
                })
            });

            await catChannel.overwritePermissions("468144107462852608", {
                VIEW_CHANNEL:false,
            });

            message.channel.send('Успешно создан клан **"' + args[1] + '"**!');
            return;
        };
        if(args[0] == "удалить"){
            const role = message.guild.roles.find(r => r.name === `Глава клана "${args[1]}"`);
            if(!args[1]) return message.channel.send("Вы не ввели название клана!");
            if(!role) return message.channel.send("Такого клана не существует!");
            if(!message.member.roles.has(role.id)) return message.channel.send("Вы не являетесь владельцем клана!");

            textName = args[1].toLowerCase();

            await message.guild.channels.find(c => c.name === `Клан "${args[1]}"` && c.type === ("category" || "null")).delete();
            await message.guild.channels.find(v => v.name === `Голосовой чат "${args[1]}"` && v.type === ("voice" || "null")).delete();
            await message.guild.channels.find(t => t.name === `текстовый-чат-${textName}`).delete();
            await message.guild.roles.find(r => r.name === `Глава клана "${args[1]}"`).delete();
            await message.guild.roles.find(r => r.name === `Участники клана "${args[1]}"`).delete();

            return message.channel.send(`Успешно удалён клан **"${args[1]}"** !`)
        }
        if(args[0] == "вступить"){
            const role = message.guild.roles.find(r => r.name === `Участники клана "${args[1]}"`);
            if(!args[1]) return message.channel.send("Вы не ввели название клана!");
            if(!role) return message.channel.send("Такого клана не существует!");
            if(message.member.roles.has(role.id)) {
                return message.channel.send('Вы уже вступили в клан **"' + args[1] + '"** !');
            }else{
                message.member.addRole(role);
                message.channel.send('Вы успешно вступили в клан **"' + args[1] + '"** !');
                return;
            }
        }
        if(args[0] == "покинуть"){
            const role = message.guild.roles.find(r => r.name === `Участники клана "${args[1]}"`);
            if(!args[1]) return message.channel.send("Вы не ввели название клана!");
            if(!role) return message.channel.send("Такого клана не существует!");
            if(!message.member.roles.has(role.id)) {
                return message.channel.send('Вы не находитесь в клане **"' + args[1] + '"** !')
            }else{
                message.member.removeRole(role);
                message.channel.send('Вы успешно покинули клан **"' + args[1] + '"** !');
                return;
            }
        }
    } catch(err) {
        client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
    }
};
