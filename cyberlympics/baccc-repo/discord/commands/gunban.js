const debug = require("debug")("discord-user-manager:discord:commands:kick");
const discord = require("discord.js");
const models = require("../../models");
const DiscordAdapter = require("../DiscordAdapter");


module.exports = {
  name: "gunban",
  aliases: ["unban"],
  description: "Allow an app-banned user to link.",
  args: true,
  usage: "<username>",
  permissions: [discord.Permissions.FLAGS.BAN_MEMBERS],
  guildOnly: true,
  cooldown: 1,
  execute: async (message, args) => {

    // Get user and set banned and ban reason
    models.User.findOne({
            where: {
                username: args[0],
            },
        })
        .then((user2) => {
          user2.update({
            isBanned: false,
            banReason: "Not banned"
          })

            DiscordAdapter.logInfo(`${args[0]} has been unbanned by ${message.author}`);
            return message.reply(`Successfully unbanned ${args[0]}`);
          
        }).catch((err) => {
        if (err.toString() === "TypeError: Cannot read property 'update' of null") {
            return message.reply("That username does not exist in the database.");
        }
        debug(`An error occured while unbanning the user: ${err}`);
        return message.reply(`An error occured while unbanning the user: ${err}`);
      });


  },
};
