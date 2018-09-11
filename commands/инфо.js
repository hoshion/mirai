exports.run = (client, message) => {
    const anotherMember = message.mentions.members.first();
    if(!anotherMember){
        message.channel.send("Аккаунт создан : " + message.member.user.createdAt);
    }
    message.channel.send("Аккаунт создан : " + anotherMember.user.createdAt);
    console.log('Команда "инфо" использована пользователем ' + message.author.username + '. Результат - успешно');
}