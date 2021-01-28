module.exports = {
  name: "mute",
  aliases: ["p"],
  description: "Get info about muting users",
  cooldown: 1,
  execute(message) {
    message.channel.send("<@155149108183695360> is the bot that handles mutes. You can mute a user using "
    	+ "`?mute <user mention or ID> [time duration] [reason]`. [] arguments are optional.");
  },
};
