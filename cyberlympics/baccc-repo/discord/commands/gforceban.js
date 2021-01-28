const debug = require("debug")("discord-user-manager:discord:commands:kick");
const discord = require("discord.js");
const models = require("../../models");
const DiscordAdapter = require("../DiscordAdapter");


module.exports = {
  name: "gforceban",
  aliases: ["forceban", "banforce", "gbanforce"],
  description: "Remove a user from the community given a username (school email) and deny attempts to relink.",
  args: true,
  usage: "<username> [reason]",
  permissions: [discord.Permissions.FLAGS.BAN_MEMBERS],
  guildOnly: true,
  cooldown: 1,
  execute: async (message, args) => {

    if (args.length > 1){
      reason = args.slice(1).join(' ');
    } else {
      reason = "No reason specified";
    }

    // Get user and set banned and ban reason
    models.User.findOne({
            where: {
                username: args[0],
            },
        })
        .then((user2) => {
          user2.update({
            isBanned: true,
            banReason: reason
          })
          try {
          const discordUser = message.guild.members.cache.get(user2.discordId);
          discordName = discordUser.user.username;
          discordId = discordUser.id;
          discordUser.kick('Kicked using gbanman command')
              .then(() => {
                // We let the message author know we were able to kick the person
                message.reply(`Found linked discord account and kicked ${discordName} (ID ${discordId}) from the discord.`);

          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply(`An error occurred while attempting to kick user from discord: ${err}`);
          });
      		} catch {
      			message.reply("The user does not appear to be in the Discord server");
      		}
            DiscordAdapter.logInfo(`${args[0]} has been banned by ${message.author} for ${reason}`);

            return message.reply(`Successfully banned ${args[0]}`);
          
        }).catch((err) => {
        if (err.toString() === "TypeError: Cannot read property 'update' of null") {
            return message.reply("That username does not exist in the database.");
        }
        debug(`An error occurred while banning manually: ${err}`);
        return message.reply(`An error occurred while banning user in database: ${err}`);
      });



  },
};
