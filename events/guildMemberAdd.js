exports.run = (client, member) => {
    const defaultChannel = member.guild.channels.get("468147021078069260");
    defaultChannel.send("К нам в избу пожаловал " + member + ", поприветствуем его !");
    member.send("Дружок, я вижу ты зашёл на сервер ***Дружелюбная Изба***. Будь хорошим мальчиком и старайся общаться. Советуем заглянуть в комнату " + member.guild.channels.get("468154431347884032") + ", " + member.guild.channels.get("468152369293819936") + ", " + member.guild.channels.get("468146986084990976") + "и " + member.guild.channels.get("468174552225284106") + ". Получай опыт и становись выше других.");
    member.addRole("468166002622988318");
    console.log("Присоединился " + member.user.username);
};