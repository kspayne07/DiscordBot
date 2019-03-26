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
	receivedMessage.channel.send('hangman command successfully called good job Kelly you doomie')
}

bot.login("NTU5ODAyOTI1MTA3MzgwMjI0.D3r7DA.rcis_wh4baAX8nd2H0EVcBwT_f8") // Replace XXXXX with your bot token