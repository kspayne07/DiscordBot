var Discord = require('discord.js');
var auth = require('./auth.json');
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
/* bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
}); */
bot.on('message', (receivedMessage) => {
    if (receivedMessage.author == bot.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage){
	let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
	
	let functionString = primaryCommand + 'Command'
	
	if (eval("typeof " + functionString) === 'undefined'){
		receivedMessage.channel.send("I don't understand the command. Try `!help` or `maybe i havent implemented that yet :3c`")
	} else { eval(primaryCommand + 'Command(arguments, receivedMessage)') }
}

function hangmanCommand(arguments, receivedMessage){
	receivedMessage.channel.send({embed: {
		color: 3447003,
		description: "A game of Hangman has been started! React with :white_check_mark: to join and :negative_squared_cross_mark: to leave."
}});
	receivedMessage.react(':white_check_mark:')
	receivedMessage.react(':negative_squared_cross_mark:')
	
}

bot.login("X") // Replace XXXXX with your bot token