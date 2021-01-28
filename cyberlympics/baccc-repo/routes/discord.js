const debug = require("debug")("discord-user-manager:discord");
const express = require("express");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;

const DiscordAdapter = require("../discord/DiscordAdapter");

const router = express.Router();

const models = require("../models");

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URI,
      scope: ["identify", "guilds.join"],
      prompt: "none",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

/* GET Discord Login page. */
router.get("/", passport.authenticate("discord"));

/* Discord login redirect URI */
router.get("/callback", (req, res, next) => {
  passport.authenticate("discord", async (err, profile) => {
  	debug("1");
    if (!req.user) {
      // The user must be authenticated in order to
      // associate with a Discord user account.
      debug("User not logged in.");
      // Redirect to the login page.
      return res.redirect("/login");
    }

    if (err || !profile) {
      debug(`An error occured logging ${req.user.username} into Discord: ${err}`);
      req.flash("info", {
        discordLoginError:
          "An error occured when adding you to the Discord server.\nWere you able to login to Discord?",
      });
      return res.redirect("/");
    }

    // Update the user's discordId and discordAvatar
    const user = req.user;

    var isBannedApp = false;
    	// Check if banned
    	models.User.findOne({
            where: {
                username: user.username,
            },
        })
        .then((user2) => {
        	debug(user2.isBanned);
        	if (user2.isBanned) {

        		 isBannedApp = true;
        		 banReasonApp = user2.banReason;
        	}
 
        }).catch((err) => {
        debug(`An error occured while checking for isBanned: ${err}`);
      });
      

        try {
    let guildMember = await DiscordAdapter.resolveGuildMember(profile.id);
    const banReason = await DiscordAdapter.isUserBanned(profile.id);


      if (isBannedApp) {
      	        req.flash("info", {
        		 errorAlert:
        			  `You are banned from joining the Discord server. Reason: ${banReasonApp}`,
     			 });
      	        debug(`${user.username} ${user.name} attempted to join but was banned at the application level. Reason: ${banReasonApp}`)
      	        DiscordAdapter.logWarning(`${user.username}(${user.name}) attempted to join but was banned at the application level. Reason: ${banReasonApp}`)

      } else if (guildMember) {
      	 req.flash("info", {
        errorAlert:
          "An error occured when adding you to the Discord server:\nThis Discord account is already on the server.\nPlease leave the server and try again.",
      });
      } else if (!banReason) {
        // Update user info.
        await user.update({
          discordId: profile.id,
          discordUsername: profile.username,
          discordDiscriminator: profile.discriminator,
          discordAvatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=512`,
        });

        // Now add the user to the discord server:
        await DiscordAdapter.addUser(profile.id, user.name, profile.accessToken, user.username);

      } else {
        debug(`User ${profile.username} is banned: ${banReason}`);

        req.flash("info", {
          errorAlert: `Could not connect to the Discord server because your account is banned: ${banReason}. Please contact the Discord owner for more information.`,
        });
      }
    } catch (err) {
      // This can happen if either the bot doesn't have the "Ban Members" permission on the
      // server or the user is tyring to use a Discord account that is registered to another user.
      debug(`An error occured while adding ${user.name} ${user.username} to the Discord server: ${err}.`);


      req.flash("info", {
        errorAlert:
          "An error occured when adding you to the Discord server.\nPlease contact the owner of the Discord server for more information.",
      });
  
    }


    // redirect to the home page.
    res.redirect("/");
      })(req, res, next);
});

/* Unlink Discord account from user login */
router.post("/logout", async (req, res) => {
  if (!req.user) {
    // User is not logged in.
    debug("User not logged in.");
    // Redirect to the main page.
    return res.redirect("/");
  }

  const user = req.user;

  await DiscordAdapter.removeUser(user.discordId, "Unlinking Discord account.");

  // Update user info.
  await user.update({
    discordId: null,
    discordUsername: null,
    discordDiscriminator: null,
    discordAvatar: null,
  });

  // Redirect to the main page.
  res.redirect("/");
});

router.get("/unlink", (req, res, next) => {
  res.redirect("/?error=InvalidHTTPMethod")
});

module.exports = router;
