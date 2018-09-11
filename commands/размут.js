exports.run = async (client, message, args) => {
    if(args[0] == "всех"){
        message.guild.members.forEach(member => member.removeRole("474161649041932288"));
        message.channel.send("Все замученные пользователи успешно размучены!");
        return;
    };

    const member = message.mentions.members.first();
    
    if (!member) return message.channel.send("Вы не указали человека!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав!");

    member.removeRole("474161649041932288")
    .then(() => message.channel.send("**" + member.user.username + "** Размучен!"))
    .catch((error) => console.log(error));
    console.log('Команда "размут" использована пользователем ' + message.author.username + '. Результат - успешно');
};