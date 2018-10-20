exports.run = async (client, message, args) => {

function declOfNum (number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20) ? 2 : cases[(number%10<5) ? number%10 : 5] ];
};

function clear_count (text, arr, channel, count, count_all = 0) {
    if (count > 100) {
        count_all = count_all + 100;
        channel.bulkDelete(100).then(() => {clear_count(text, arr, channel, count-100, count_all)});
    } else {
        channel.bulkDelete(count).then(messages => {
            count_all = count_all + messages.size;
            channel.send(text+` \`${count_all}\` ${declOfNum(count_all, arr)}.`).then((msg) => {msg.delete(3000);});
        });
    }
};

message.delete().then(() => {
	func.clear_count('Успешно удалено', ['сообщение', 'сообщения', 'сообщений'], message.channel, parseInt(args[0]));
});
}
