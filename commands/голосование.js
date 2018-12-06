exports.run = (client, message, args) => {
	const word = args.join(" ").replace(/" +?"/g, " ");
	message.channel.send(`${word[0]} ${word[2]} ${word[4]}`);
}
