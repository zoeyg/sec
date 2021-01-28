const debug = require("debug")("discord-user-manager:discord:commands:kick");
const discord = require("discord.js");
const models = require("../../models");
const DiscordAdapter = require("../DiscordAdapter");


module.exports = {
  name: "gban",
  aliases: ["ban"],
  description: "Remove a user from the community given a discord user and deny attempts to relink.",
  args: true,
  usage: "<user mention> [reason]",
  permissions: [discord.Permissions.FLAGS.BAN_MEMBERS],
  guildOnly: true,
  cooldown: 1,
  execute: async (message, args) => {

    if (!(message.mentions.users.size)) {
      return message.reply("No user currently in the discord server mentioned in ban command.");
    }
    if (args.length > 1){
      reason = args.slice(1).join(' ');
    } else {
      reason = "No reason specified";
    }

    const user = message.mentions.users.first();
    const member = message.guild.member(user);


    if (user === message.author) {
      return message.reply("You can't ban yourself.");
    }

    // Get user and set banned and ban reason
    models.User.findOne({
            where: {
                discordId: member.id,
            },
        })
        .then((user2) => {
          user2.update({
            isBanned: true,
            banReason: reason
          })
        }).catch((err) => {
          if (err.toString() === "TypeError: Cannot read property 'update' of null") {
            return message.reply("That discord user is not linked with any user in the database. Did they manually join the discord server?");
          }
        debug(`An error occured while banning user: ${err}`);
        return message.reply(`An error occured while banning user in database: ${err}`);
      });

    if (member) {
      try {
        await member.kick("Kicked by bot ban command.");
        message.reply(`Successfully banned ${user.tag}`);
        DiscordAdapter.logInfo(`${user.tag} has been banned by ${message.author} for ${reason}`);
      } catch (err) {
        debug(err);
        message.reply(`Unable to ban ${user.tag}`);
      }
    } else {
      message.reply(`User ${user.tag} is not a guild member.`);
    }
  },
};
