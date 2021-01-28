<!-- markdownlint-disable MD041 MD034 -->

![Discord User Manager][title image]

# Discord User Manager

## DISCLAIMER: THIS APPLICATION MAY STORE SENSITIVE INFORMATION ABOUT USERS. YOU ARE NOT ALLOWED TO USE THIS WITHOUT PROPER ENCRYPTION OF DATA WHILE AT REST AND PROPER SECURING OF SERVERS FROM UNAUTHORIZED ACCESS AS PER DISCORD'S DEVELOPER TERMS OF SERVICE. IF YOU DO NOT UNDERSTAND WHAT THIS IS OR HOW TO DO IT, DO NOT USE THIS SOFTWARE. YOU WILL NEED TO SET UP A REVERSE PROXY TO USE HTTPS (I do not support https at the application level).

## Licensing: 
The original software was licensed under the MIT license and can be found at https://github.com/jpvanoosten/discord-user-manager. All modifications made in this repository and not pull requested into the upstream fork is to also be licensed under the MIT license.
The full text of the license can be found at ./LICENSE.

The **Discord User Manager** allows users to join your [Discord] server by authenticating with an [OAuth 2.0] provider aka [Google]. This is useful if your school or work is using [G Suite] from [Google] and you want to restrict the members of your [Discord] server to the members of your organization or domain. This allows you to have more control over who is able to join your Discord server without having to manage Discord invites.

## Dependencies

The **Discord User Manager** is built with JavaScript using [Express] and the [Pug] template engine with [Bootstrap] for HTML, CSS, and JavaScript framework. The **Discord User Manager** project has a dependency on the following packages:

| Package                     | Semantic Version | Description                                                                                                                     |
| --------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [bcrypt]                    | ^5.0.0           | Pasword hashing used for logging into local accounts. Passwords for [OAuth] accounts are not stored locally.                    |
| [connect-flash]             | ^0.1.1           | Used for passing messages between http requests. Flash messages use session storage to persists messages between http requests. |
| [connect-session-sequelize] | ^6.0.0           | SQL Session store using [Sequelize] as a storage backend.                                                                       |
| [cookie-parser]             | ~1.4.4           | Parse the `Cookie` header and populate `req.cookies` property with an object keyed by the cookie name.                     |
| [csurf]                     | ^1.11.0          | Add CSRF protection                                                                                                    |
| [debug]                     | ~2.6.9           | A JavaScript debugging utility.                                                                                                 |
| [discord.js]                | ^12.3.1          | A powerful library for interacting with the Discord API.                                                                        |
| [dotenv]                    | ^8.1.0           | Loads environment variables from a `.env` file into the `process.env` global variable.                                          |
| [express]                   | ~4.16.1          | A fast, unopinionated, minimalist web framework for [Node.js].                                                                  |
| [express-session]           | ^1.16.2          | [Express] middleware which will populate the `req.session` object.                                                              |
| [helmet]                    | ^3.21.0          | Helps to secure your [Express] web application.                                                                                 |
| [http-errors]               | ~1.6.3           | Used to create HTTP error responses (for unmatched route handling for example).                                                 |
| [jsonwebtoken]              | ^8.5.1           | Impelements [JSON Web Token](JWT).                                                                                              |
| [morgan]                    | ~1.9.1           | HTTP request logger middleware for [Node.js]                                                                                    |
| [passport]                  | ^0.4.0           | [Passport] is [Express]-compatible authentication middleware for [Node.js].                                                     |
| [passport-discord]          | ^0.1.3           | [Passport] strategy for authentication with [Discord] through the [OAuth 2.0] API.                                              |
| [passport-google-oauth20]   | ^2.0.0           | [Passport] strategy for authenticating with [Google] using the [OAuth 2.0] API.                                                 |
| [passport-local]            | ^1.0.0           | [Passport] strategy for authenticating with username and password.                                                              |
| [pug]                       | ^3.0.0           | High performance template engine.                                                                                               |
| [sequelize]                 | ^5.18.4          | A promise-based [Node.js] ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.                                   |
| [sqlite3]                   | ^5.0.0           | Asynchronous, non-blocking [SQLite3] bindings for [Node.js].                                                                    |

## Development Dependencies

In addition to the regular dependencies, the **Discord User Manager** also has the following development dependecies.

| Package                  | Semantic Version | Description                                                                                         |
| ------------------------ | ---------------- | --------------------------------------------------------------------------------------------------- |
| [@types/jest]            | ^24.0.19         | Type definitinos for [Jest].                                                                        |
| [browser-sync]           | ^2.26.7          | Automatically syncronize changes to multiple devices during development.                            |
| [connect-browser-sync]   | ^2.1.0           | Injects the necessary [BrowserSync] &lt;script&gt; tags into the HTML pages.                        |
| [eslint]                 | ^6.3.0           | [ESLint] is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.   |
| [eslint-config-prettier] | ^6.11.0          | Turns off all rules that are unnecessary or might conflict with Prettier.                           |
| [eslint-plugin-jest]     | ^22.19.0         | [ESLint] plugin for [Jest].                                                                         |
| [eslint-plugin-jquery]   | ^1.5.1           | Adds support for JQuery in ESLint                                                                   |
| [eslint-plugin-prettier] | ^3.1.4           | Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.                |
| [jest]                   | ^24.9.0          | A JavaScript testing framework.                                                                     |
| [nodemon]                | ^1.19.2          | A tool that automatically restarts the [Node.JS] application when file changes are detected.        |
| [open]                   | ^7.2.0           | Open stuff like URLs, files, executables.                                                           |
| [prettier]               | ^2.1.0           | Opinionated Code Formatter.                                                                         |
| [sequelize-cli]          | ^5.5.1           | The [Sequelize] Command Line Interface (CLI).                                                       |
| [stoppable]              | ^1.1.0           | Node's server.close() - the way you probably expected it to work by default.                        |
| [yargs]                  | ^14.0.0          | Build interactive command line tools by parsing arguments and generating an elegant user interface. |

## Installation

**Discord User Manager** requires [Node.js] (version 12 or higher) in order to be installed.

Either download the source from https://github.com/burturt/discord-user-manager or install it from the command line:

```bash
git clone https://github.com/burturt/discord-user-manager.git
```

Make sure the current working directory is set to the directory where the repo was cloned to:

```bash
cd discord-user-manager
```

Install package dependencies:

```bash
npm install
```

or if using [Yarn]:

```bash
yarn
```

## Configuration

The **Discord User Manager** uses environment variables to configure a lot of functionality. The [.env.example] file contains all of the environment variables used by the **Discord User Manager**.

The following table describes the configurable environment varaibles.

| Variable               | Default Value                          | Description                                                                                                                                                                                           |
| ---------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NODE_ENV               | development                            | When running in production, make sure the value of this variable is **production**. When running in development, some additional features (such as debug logging and browser sync) will be available. |
| PORT                   | 3000                                   | What port the [Express] server should listen on.                                                                                                                                                      |
| DEBUG                  | discord-user-manager:\*                | Conrols what debug messages are logged.                                                                                                                                                               |
| USE_BROWSER_SYNC       | false                                  | Whether [BrowserSync] should be enabled or not.                                                                                                                                                       |
| ADMIN_USERNAME         | admin                                  | The username for the default administrator account.                                                                                                                                                   |
| ADMIN_PASSWORD         |                                        | The password for the default administrator account.                                                                                                                                                   |
| SESSION_SECRET         |                                        | The secret used to sign the session ID cookie.                                                                                                                                                        |
| GOOGLE_CLIENT_ID       |                                        | OAuth 2.0 Client ID from the [Google Developer Console].                                                                                                                                              |
| GOOGLE_CLIENT_SECRET   |                                        | OAuth 2.0 Cient Secret from the [Google Developer Console].                                                                                                                                           |
| GOOGLE_REDIRECT_URI    | http://localhost:3000/google/callback  | The path in your application that users are redirected to after they have authenticated with Google. This is configured in the [Google Developer Console Credentials].                                |
| DISCORD_CLIENT_ID      |                                        | OAuth 2.0 Client ID from the [Discord Developer Portal].                                                                                                                                              |
| DISCORD_CLIENT_SECRET  |                                        | OAuth 2.0 Client Secret from the [Discord Developer Portal].                                                                                                                                          |
| DISCORD_REDIRECT_URI   | http://localhost:3000/discord/callback | The path in your appliation that users are redirected to after they have authenticated with [Discord].                                                                                                |
| DISCORD_BOT_TOKEN      |                                        | The unique token used to authenticate the Bot with the [DiscordJS] client.                                                                                                                            |
| DISCORD_SERVER_ID      |                                        | The unique identifier for the [Discord] server.                                                                                                                                                       |
| TEST_USER_DISCORD_ID   |                                        | The unique identifer for a [Discord] user. (Only used for testing).                                                                                                                                   |
| TEST_USER_ACCESS_TOKEN |                                        | An access token for a [Discord] user. (Only used for testing).                                                                                                                                        |

### Privacy Policy and Code of Conduct
The Code of Conduct and Privacy Policy are not included. You can find samples ones [here](https://github.com/jpvanoosten/discord-user-manager/blob/master/views/code-of-conduct-content.pug) and [here](https://github.com/jpvanoosten/discord-user-manager/blob/master/views/privacy-policy-content.pug).

### Auto Configuration

The **Discord User Manager** server can either be manually configured by copying the `.env.example` file to `.env` and modifying the environment varaibles, or you can run the `configure` command to auto-configure many of the required environment variables. To auto-generate the `.env` file based on the [.env.example] file, run the following command:

```bash
npm run configure
```

or

```bash
yarn configure
```

The `configure` command will configure the `.env` file with automatically generated passwords and secrets based on the contents of the [.env.example] file.

If the `.env` file already exsits in the root directory of the project, then the `configure` command will not overwrite the file. If you want to force the `.env` file to be overwritten, then you can pass the aditional `--force` arguments:

```bash
npm run configure --force
```

or

```bash
yarn configure --force
```

> **NOTE**: The `.env` file contains sensitive secret information that could allow administrator access to your user's personal information and your Discord Bot. Never commit the `.env` file into version control and never use the [.env.example] file to store secret information since the [.env.example] file is part of version control.

## Google Authentication

In order to allow your users to authenticate with Google, you must first create a Google Cloud Project in the [Google Developer Console].

### Create a New Project

- Navigate to https://console.developers.google.com/ and sign-in with a Google account.
- Click **Select a project** from main menu.

![Select a project](docs/images/gcp-1.png)

- Click the **NEW PROJECT** button (top-right) to create a new project, or select an existing project from the list.

![Project name](docs/images/gcp-2.png)

- Give your project a meaningful name (like **discord-user-manager**).
- Click the **CREATE** button to create the new project.

### OAuth Consent Screen

- From the hamburger menu on the top-left corner of the page, select **APIs & Services > OAuth consent screen**

![OAuth consent](docs/images/gcp-5.png)

- If you are presented with the analytics screen, select the **🖊 EDIT APP** button next to the application name.

![Oauth consent analytics](docs/images/gcp-8.png)

- In the **OAuth consent screen** that appears, specify the **Application name**.
- Optionally, you can also add an **Application logo** which will also appear on the OAuth consent screen.

![OAuth consent screen](docs/images/gcp-6.png)

- Scroll to the bottom of the page and click the **Save** button.

### Create OAuth client ID

In order to use OAuth 2.0 to allow users to login to your application, you need to configure a **Web application** for the Google Cloud Project.

- From the hamburger menu on the top-left corner of the page, select **API & Services > Credentials**.

![Credentials](docs/images/gcp-9.png)

- Click the **+ CREATE CREDENTIALS** button at the top of the screen.

![Create Credentials](docs/images/gcp-10.png)

- Select **OAuth client ID** from the pop-up list.

![OAuth client ID](docs/images/gcp-11.png)

- Set the **Application type** to **Web application**.

![Application type](docs/images/gcp-12.png)

- Give the Web application a **Name**. This is the name that will appear on the OAuth 2.0 login screen.

- Under the **Authorised redirect URIs** section, click the **+ ADD URI** button to add a redirect URI to be used with requests from a web server.

![Redirect URI](docs/images/gcp-13.png)

- In order to allow for testing the application on a locally running server, you must add `http://localhost:3000/google/callback` redirect URI.

- Also add the redirect URI that is specified in the `GOOGLE_REDIRECT_URI` configuration environment variable specified in your `.env` file in your production environment.

- Click the **CREATE** button on the bottom of the page to create the OAuth client credentials.

![OAuth client created](docs/images/gcp-14.png)

- Copy the **Client ID** and paste it in the value for the `GOOGLE_CLIENT_ID` variable in the `.env` file (never commit this value to version control).
- Copy the **Client Secret** and paste it in the value for the `GOOGLE_CLIENT_SECRET` variable in the `.env` file (never commit this value to version control).

## Discord Authentication

### Create a Discord Application

In order to allow users to log into Discord and join the Discord server, you must create a Discord application and add a Discord bot in the [Discord Developer Portal].

![Discord Developer Portal](docs/images/ddp-1.png)

- Navitate to https://discord.com/developers and log in with your Discord account.
- Click the **New Application** button in the top-right corner of the screen.

![Create a Discord application](docs/images/ddp-2.png)

- Give the application a name like **Discord User Manager**. This name will be used to identify your application in the OAuth consent screen.
- Click the **Create** button to create a new Discord application.

![Discord application information](docs/images/ddp-3.png)

- Copy the **Client ID** and paste it into the value for the `DISCORD_CLIENT_ID` variable in the `.env` file (never commit this value to version control).
- Copy the **Client Secret** and paste it into the value for the `DISCORD_CLIENT_SECRET` variable in the `.env` file (never commit this value to version control).
- Select the **OAuth2** settings.

![Discord OAuth2](docs/images/ddp-4.png)

- Click the **Add Redirect** button.
- In order to test your application on a locally running server, you must add `http://localhost:3000/discord/callback` as a redirect URI.
- Also add the value of the `DISCORD_REDIRECT_URI` environment variable in the `.env` file in your production environment.

![Redirect URI](docs/images/ddp-5.png)

- Click the **Save Changes** button on the bottom of the screen.
- Next, select the **Bot** settings.

## Add a Discord Bot

A Discord Bot is a privileged user that can perform certain actions within your Discord server on your behalf.

![Add Discord Bot](docs/images/ddp-6.png)

- Click the **Add Bot** button to add a bot to your Discord application.

![Discord Bot Settings](docs/images/ddp-7.png)

- Give the Discord bot a username such as **Discord User Manager**.
- Optionally, you can give the Discord bot an image icon. This is the icon that will be used to represent this bot in your Discord server.
- Since the bot will only be used by your own Discord server, uncheck **Public Bot** setting.
- Ensure that the rest of the options on the Bot screen are also disabled.
- Click the **Save Changes** button on the bottom of the screen.
- Click the **Copy** button under **TOKEN** section and paste the bot token to the value of the `DISCORD_BOT_TOKEN` environment variable in the `.env` file.

### Add Application to your Discord Server

Before the Discord User Manager application can start working to manage the users in your Discord Server, you need to add the Discord application and bot that you created in the previous step to your Discord server.

- Select the **OAuth2** settings again.

![Bot Scopes and Permissions](docs/images/ddp-8.png)

- Scroll down to **Scopes** and check the following scopes:
  - identity
  - email
  - guilds
  - guilds.join
  - bot
- Under **Bot Permissions** select the following permissions:
  - Manage Roles
  - Kick Members
  - Ban Members
  - Create Instant Invite
  - Manage Nicknames
  - Send Messages
  - Add Reactions
- Copy the URL in the **Scopes** section and paste it into the address bar of your browser.

![Authorize Discord User Manager](docs/images/ddp-9.png)

- Select the server you want to add the bot to and click the **Continue** button.

![Authorize Discord User Manager](docs/images/ddp-10.png)

- On the next screen that appears, make sure all of the requested permissions are checked.
- Click the **Authorize** button to add the Discord Bot to your server.
- If you go to your Discord Server, you should see the **Discord User Manager** bot as a member of your server.

![Discord Server](docs/images/ddp-11.png)

The **Discord User Manager** bot has now been added to your server and is able to perform user management tasks for you.

The bot may appear offline but this is normal if the **Discord User Manager** application is not yet running.

### Configure the Discord Bot

Now that the Discord bot has been added to your Discord server, a few more settings need to be configured on the Discord User Manager server.

- Open the Discord application and go to **User Settings**
- Select the **Appearance** under **App Settings**

![App Settings](docs/images/ddp-12.png)

- Scroll to the bottom of the page and enable the **Developer Mode** option.

Enabling the **Developer Mode** option will allow you to copy the server ID, user ID, channel ID, and message ID from the Discord application (even when using the desktop application).

![Copy server ID](docs/images/ddp-13.png)

- Right-click on the server icon on the left of the screen and select the **Copy ID** option in the pop-up menu that appears.
- Paste the server ID into the value of the `DISCORD_SERVER_ID` in the `.env` file.

## Add your code of conduct and privacy policy
Your code of conduct and privacy policy pug files should go to /views/code-of-conduct.pug and /views/privacy-policy.pug. Example files can be found in /views, remove the .example extension to use.

## Start the Discord User Manager

To start the **Discord User Manager** application, open a terminal and navigate to the root folder where you cloned the discord-user-manager git repository and run the following command:

```bash
npm run start
```

Or if using [Yarn]:

```bash
yarn start
```

If the service starts correctly, you should see `Listening on port 3000` printed to the console.

Open your browser and navigate to http://localhost:3000.

![Discord User Manager](docs/images/dum-1.png)

If everything worked correctly, you should see the home page for the **Discord User Manager** application (as shown in the image above).

## Verify Discord Bot

If you return to your Discord server, you should see that the **Discord User Manager** bot is online.

To see if the bot responds to commands, type `!ping` in one of the text channels of your server (make sure the bot can read the messages of the channel you use to type bot commands).

![Test Bot Commands](docs/images/ddp-14.png)

If the bot is running correctly, it should reply with `Pong.` printed to the same text channel.

If you want to see a list of possible commands the bot can respond to, use the `!help` bot command. The bot should respond with a direct message that contains list of bot commands that it knows about.

## Add Custom Bot Commands

You can create custom bot commands by adding a JavaScript file to the discord/commands folder. The file should export an object with the following properties:

| Property    | Type                                                  | Required | Description                                                                                                                                                                                                                                                                                                              |
| ----------- | ----------------------------------------------------- | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name        | string                                                |    ✔     | The name that is used to identify the command.                                                                                                                                                                                                                                                                           |
| description | string                                                |          | A brief description of the command. Used to diplay documentation using the `!help` bot command.                                                                                                                                                                                                                          |
| aliases     | string[]                                              |          | An array of aliases for the command.                                                                                                                                                                                                                                                                                     |
| usage       | string                                                |          | A list of expected arguments for the command.                                                                                                                                                                                                                                                                            |
| args        | boolean                                               |          | Set to `true` if this command expects arguments. If `true` and no arguments are provided, an error is generated displaying the `usage` string.                                                                                                                                                                           |
| cooldown    | number                                                |          | The time in seconds that the command can be exectued again.                                                                                                                                                                                                                                                              |
| guildOnly   | boolean                                               |          | `true` if this command can only be executed in the context of a guild channel. If `true`, an error is generated if the command is executed in a direct message to the bot.                                                                                                                                               |
| permissions | [Discord.PermissionResolvable]\[]                     |          | An array of permission flags that the user executing the command must have. See https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS                                                                                                                                                             |
| execute     | function (message: [Discord.Message], args: string[]) |    ✔     | The function that is executed when the command is received by the bot. The `message` parameter is the Discord message that was received. The `args` parameter are any additional arguments that were provided in the message. If the command doesn't take any additional arguments, the `args` parameter can be omitted. |

An example command file looks like this:

```js
// Error messages can be logged to a debug stream.
const debug = require("debug")("discord-user-manager:discord:commands:kick");
// The DiscordJS API
const discord = require("discord.js");

module.exports = {
  // The command name (excluding the command prefix).
  name: "kick",

  // Command aliases.
  aliases: ["k"],

  // A description of the command.
  description: "Kick a user from the Discord guild server.",

  // Does this command expect any additional arguments?
  args: true,

  // Specify the expected arguments.
  usage: "<guildUser>",

  // The user executing the command must have the following permissions.
  permissions: [discord.Permissions.FLAGS.KICK_MEMBERS],

  // Can this command only be run in the context of a guild channel?
  guildOnly: true,

  // Elapsed time (in seconds) between subsequent execution of the command.
  cooldown: 1,

  // The function that executes the command.
  execute: async (message) => {
    if (!message.mentions.users.size) {
      return message.reply("No user mentioned in kick command.");
    }

    const user = message.mentions.users.first();
    if (user === message.author) {
      return message.reply("You can't kick yourself.");
    }

    const member = message.guild.member(user);
    if (member) {
      try {
        await member.kick("Kicked by bot kick command.");
        message.reply(`Successfully kicked ${user.tag}`);
      } catch (err) {
        debug(err);
        message.reply(`Unable to kick ${user.tag}`);
      }
    } else {
      message.reply(`User ${user.tag} is not a guild member.`);
    }
  },
};
```

## Reaction Based Roles

// TODO: This section still needs to be filled in.

# Testing

[Jest] is used to perform unit testing on the server. Some of the test cases require a valid Discord user in order to run. A valid OAuth 2.0 access token is required for the test user. Use the `utils/getDiscordOAuthToken.js` script to populate the `TEST_USER_ACCESS_TOKEN` and `TEST_USER_DISCORD_ID` values in the `.env` file.

> Note: If the `TEST_USER_DISCORD_ID` and `TEST_USER_ACCESS_TOKEN` keys are not in the `.env` file, nothing will be replaced. Please make sure these keys exist in the `.env` file before running this script.

Using the terminal:

```bash
node utils/getDiscordOAuthToke.js
```

Using npm:

```bash
npm run oauth:discord
```

Using Yarn:

```bash
yarn oauth:discord
```

## Run Jest

To run the unit tests for the Discord bot, open a terminal in the root folder of the project and use the following command:

```bash
npm run test
```

or if you are using [yarn]:

```bash
yarn test
```

If all tests pass, you should see the following output in the terminal:

```bash
 PASS  discord/DiscordAdapter.test.js
  √ resolve welcome channel (2ms)
  √ resolve default role (1ms)
  √ can add user to role (599ms)
  √ add user to invalid role (30ms)
  √ add invalid user to role (1ms)
  √ welcome URL
  √ add existing user (168ms)
  √ add invalid user
  √ remove invalid user (1ms)
  √ send log to channel (1ms)

----------------------------------------|----------|----------|----------|----------|-------------------|
File                                    |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------------------------------|----------|----------|----------|----------|-------------------|
All files                               |    50.88 |    23.04 |    54.55 |    51.02 |                   |
 discord-user-manager                   |      100 |      100 |      100 |      100 |                   |
  settings.js                           |      100 |      100 |      100 |      100 |                   |
 discord-user-manager/config            |      100 |      100 |      100 |      100 |                   |
  config.js                             |      100 |      100 |      100 |      100 |                   |
 discord-user-manager/discord           |    59.92 |     31.4 |    67.57 |    59.69 |                   |
  DiscordAdapter.js                     |    59.77 |     31.4 |    67.57 |    59.53 |... 45,646,648,651 |
  config.js                             |      100 |      100 |      100 |      100 |                   |
 discord-user-manager/discord/commands  |    13.95 |        0 |        0 |    14.46 |                   |
  args-info.js                          |    16.67 |        0 |        0 |    16.67 |        6,7,8,9,12 |
  help.js                               |     9.76 |        0 |        0 |    10.53 |... 69,70,72,73,76 |
  kick.js                               |    18.75 |        0 |        0 |    18.75 |... 26,27,29,30,33 |
  ping.js                               |       50 |      100 |        0 |       50 |                 7 |
  prune.js                              |    14.29 |        0 |        0 |    14.29 |... 33,35,37,39,40 |
 discord-user-manager/discord/reactions |       20 |        0 |        0 |       20 |                   |
  add_role.js                           |       20 |        0 |        0 |       20 |... 36,37,38,40,43 |
 discord-user-manager/models            |    95.83 |    66.67 |      100 |    95.83 |                   |
  index.js                              |       95 |    66.67 |      100 |       95 |                13 |
  user.js                               |      100 |      100 |      100 |      100 |                   |
----------------------------------------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        4.33s
Ran all test suites.
```

Some common reasons why some of the tests fail:

1. The Discord guild server does not have a welcome channel. See [discord/config.js].
2. The Discord guild server does not have a default role. See [discord/config.js].
3. The Discord guild server does not have a logs channel. See [discord/config.js].
4. The test user's OAuth access token is not valid. See [Testing](#Testing).
5. The test user's ID does not match that of the access token. See [Get Discord User ID](#get-discord-user-id).

[.env.example]: .env.example
[bootstrap]: https://getbootstrap.com/
[oauth]: https://oauth.net/
[oauth 2.0]: https://oauth.net/2/
[discord]: https://discordapp.com/
[discordjs]: https://discord.js.org/
[g suite]: https://gsuite.google.com
[google]: https://www.google.com
[office 365]: https://www.office365.com
[microsoft]: https://www.microsoft.com
[express]: https://expressjs.com
[pug]: https://pugjs.org
[title image]: /docs/images/discord-user-manager.gif
[bcrypt]: https://www.npmjs.com/package/bcrypt
[connect-flash]: https://www.npmjs.com/package/connect-flash
[connect-session-sequelize]: https://www.npmjs.com/package/connect-session-sequelize
[sequelize]: https://sequelize.org/
[cookie-parser]: https://www.npmjs.com/package/cookie-parser
[csurf]: https://www.npmjs.com/package/csurf
[debug]: https://www.npmjs.com/package/debug
[discord.js]: https://github.com/discordjs/discord.js
[dotenv]: https://www.npmjs.com/package/dotenv
[node.js]: https://nodejs.org
[express-session]: https://www.npmjs.com/package/express-session
[helmet]: https://www.npmjs.com/package/helmet
[http-errors]: https://www.npmjs.com/package/http-errors
[jsonwebtoken]: https://www.npmjs.com/package/jsonwebtoken
[json web token]: https://tools.ietf.org/html/rfc7519
[morgan]: https://www.npmjs.com/package/morgan
[passport]: http://www.passportjs.org/
[passport-discord]: https://www.npmjs.com/package/passport-discord
[passport-google-oauth20]: https://www.npmjs.com/package/passport-google-oauth20
[passport-local]: https://www.npmjs.com/package/passport-local
[sqlite3]: https://www.npmjs.com/package/sqlite3
[sqlite]: https://sqlite.org/index.html
[@types/jest]: https://www.npmjs.com/package/@types/jest
[jest]: https://jestjs.io/
[browser-sync]: https://www.npmjs.com/package/browser-sync
[browsersync]: https://browsersync.io/
[connect-browser-sync]: https://www.npmjs.com/package/connect-browser-sync
[eslint]: https://eslint.org/
[eslint-config-prettier]: https://www.npmjs.com/package/eslint-config-prettier
[eslint-plugin-jest]: https://www.npmjs.com/package/eslint-plugin-jest
[eslint-plugin-jquery]: https://www.npmjs.com/package/eslint-plugin-jquery
[eslint-plugin-prettier]: https://www.npmjs.com/package/eslint-plugin-prettier
[open]: https://www.npmjs.com/package/open
[nodemon]: https://nodemon.io/
[prettier]: https://prettier.io/
[sequelize-cli]: https://www.npmjs.com/package/sequelize-cli
[stoppable]: https://www.npmjs.com/package/stoppable
[yargs]: https://www.npmjs.com/package/yargs
[yarn]: https://yarnpkg.com/
[google developer console]: https://console.developers.google.com/
[google developer console credentials]: https://console.developers.google.com/apis/credentials
[discord developer portal]: https://discord.com/developers
[discord.message]: https://discord.js.org/#/docs/main/stable/class/Message
[discord.permissionresolvable]: https://discord.js.org/#/docs/main/stable/typedef/PermissionResolvable
[postman]: https://www.postman.com/
[discord/config.js]: discord/config.js
