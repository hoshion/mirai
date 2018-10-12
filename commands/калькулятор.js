exports.run = (client, message, args) => {
    const number1 = args[0];
    const sign1 = args[1];
    const number2 = args[2];
    if(!args[3]){
        if(sign1 == "+"){
            const calc = parseInt(number1) + parseInt(number2);
            message.channel.send(calc);
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
            if(number2 == 0) return message.channel.send("НА НОЛЬ ДЕЛИТЬ НЕЛЬЗЯ СУКА!");
            const calc = parseInt(number1) / parseInt(number2);
            message.channel.send(calc);
        }
        if(sign1 == "%"){
            const calc = parseInt(number1) % parseInt(number2);
            message.channel.send(calc);
        }
    }
}
