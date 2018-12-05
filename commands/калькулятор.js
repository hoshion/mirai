exports.run = (client, message, args) => {
    const number1 = args[0];
    const sign1 = args[1];
    const number2 = args[2];
    if(!args[3]){
        if(sign1 == "+"){
            message.channel.send(eval(`${number1} ${si} ${}`));
        }
        if(sign1 == "-"){
            const calc = parseInt(number1) - parseInt(number2);
            message.channel.send(calc);
        }
        if(sign1 == "*"){
            const calc = parseInt(number1) * parseInt(number2);
            message.channel.send(calc);
        }
        if(sign1 == ":"){
            if(number2 == 0) return message.channel.send("На ноль делить нельзя!");
            const calc = parseInt(number1) / parseInt(number2);
            message.channel.send(calc);
        }
        if(sign1 == "%"){
            const calc = parseInt(number1) % parseInt(number2);
            message.channel.send(calc);
        }
    }
}
exports.help = (client, message) => {
    message.channel.send(`**Информация о команде "калькулятор"**\n\nС её помощью, вы сможете делать простейшие действия с 2 числами.\nЧтобы использовать, напишите \`-калькулятор число знак число\``)
}
