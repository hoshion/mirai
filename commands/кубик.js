exports.run = (client, message, args) => {
    if(!args[0]) return message.channel.send("Вы не ввели число!");
    const random = Math.floor(Math.random() * parseInt(args[0])) + 1;
    message.channel.send("Ваше число : **" + random + "**!");
    console.log('Команда "кубик" использована пользователем ' + message.author.username + '. Результат - успешно');
}