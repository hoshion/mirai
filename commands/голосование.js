exports.run = (client, message, args) => {
	const word = args.join(" ").split(/" +?"/g);
	message.channel.send(`${word[0]} ${word[1]} ${word[2]}`);
}
