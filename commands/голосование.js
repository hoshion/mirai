exports.run = (client, message) => {
	const args = message.content.slice(14).trim().split(` "`);
	function argsReturn(number){
		if(!number) {
			return " "
		} else {
			return number;
		}
	}
	message.channel.send(args[0] + args[1] + argsReturn(args[2]));
}
