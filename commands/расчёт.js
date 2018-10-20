exports.run = (client, message) => {
	for(let i = 208; i < 156000;){
		let n = 205
		i = n + i * 0.40
		console.log(i)
		i = i - n
	}
}
