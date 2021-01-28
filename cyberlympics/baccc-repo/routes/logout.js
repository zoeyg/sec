const debug = require("debug")("discord-user-manager:logout");
const express = require("express");
const router = express.Router();

/* GET logout page. */
router.post("/", (req, res, next) => {
  const username = req.user && req.user.username;
  if (req.session) {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        debug(`An error occurred while destroying the session: ${err}`);

        next(err);
      } else {
        if (username) {
          debug(`User ${username} logged out.`);
        }
        // Clear the cookie that stores the session id.
        res.clearCookie("sid");
        // Redirect to the home page.
        res.redirect("/");
      }
    });
  } else {
    debug("Session is not defined.");

    const err = new Error("Session is not defined.");
    err.status = 403;
    next(err);
  }
});

router.get("/", (req, res, next) => {
  res.redirect("/?error=InvalidHTTPMethod")
});

module.exports = router;
