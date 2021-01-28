// eslint-disable-next-line no-unused-vars
const debug = require("debug")("discord-user-manager:index");
const express = require("express");

const DiscordAdapter = require("../discord/DiscordAdapter");
const router = express.Router();

/* POST home page */
router.post("/", async (req, res) => {
  if (req.body.codeOfConduct) {
    res.cookie("codeOfConduct", true, {
      maxAge: 3.154e10, // 1 year.
    });
    res.redirect(`/`);
  } else if (req.body.privacyPolicy) {
    res.cookie("privacyPolicy", true, {
      maxAge: 3.154e10, // 1 year.
    });
    res.redirect(`/`);
  } else {
    res.redirect("/?error=postNoPayload");
  }

})

/* GET home page. */
router.get("/", async (req, res) => {
  /*
  if (req.query.codeOfConduct === "true") {
    res.cookie("codeOfConduct", req.query.codeOfConduct, {
      maxAge: 3.154e10, // 1 year.
    });
  }

  if (req.query.privacyPolicy === "true") {
    res.cookie("privacyPolicy", req.query.privacyPolicy, {
      maxAge: 3.154e10, // 1 year.
    });
  }

  */
  if (req.query.error === "postNoPayload") {
    req.flash("info", {
      errorAlert: `An unexpected error occurred - Empty POST request. Please contact the webmaster if this continues to occur.`,
    });
  }

  if (req.query.error === "CSRFInvalid") {
    req.flash("info", {
      errorAlert: `An unexpected error occurred - Invalid CSRF token. Please contact the webmaster if this continues to occur.`,
    });
  }

  if (req.query.error === "InvalidHTTPMethod") {
    req.flash("info", {
      errorAlert: `An unexpected error occurred - Invalid HTTP Method. Please contact the webmaster if this continues to occur.`,
    });
  }


  const flashMessages = req.flash("info")[0];

  // Get the URL of the Discord welcome channel:
  let welcomeChannelURL = "https://discordapp.com/channels/@me";
  try {
    welcomeChannelURL = await DiscordAdapter.getWelcomeChannelURL();
  } catch (err) {
    debug(`An error occured while getting URL for welcome channel: ${err}`);
  }

  res.render("index", {
    pageTitle: "Home",
    ...flashMessages,
    welcomeChannelURL,
  });
});

/* GET privacy-policy page. */
router.get("/privacy-policy", (req, res) => {
  const flashMessages = req.flash("info")[0];

  res.render("privacy-policy", {
    pageTitle: "Privacy Policy",
    ...flashMessages,
  });
});

/* GET code-of-conduct page. */
router.get("/code-of-conduct", (req, res) => {
  const flashMessages = req.flash("info")[0];

  res.render("code-of-conduct", {
    pageTitle: "Code of Conduct",
    ...flashMessages,
  });
});

module.exports = router;
