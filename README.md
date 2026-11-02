# Lunar Bot

A Discord bot written in TypeScript with [Oceanic.js](https://oceanic.ws). It adds slash commands for looking up users and servers, plus a few fun ones. Some command text is in Portuguese.

## Main commands

Commands are grouped by category, so you run them as `/<category> <command>`, for example `/info avatar`.

| Command | What it does |
| --- | --- |
| `/info help` | Browse commands by category from a dropdown menu |
| `/info avatar`, `/info banner` | Show a user's avatar or banner |
| `/info discord` | Show information about a user |
| `/info servidor` | Show information about the server |
| `/info oldest`, `/info youngest` | Find the oldest or youngest Discord account on the server |
| `/info developer` | Show who made the bot |
| `/fun magic8ball` | Ask the magic 8-ball |
| `/fun dice` | Roll a die |
| `/fun emojify` | Rewrite your message with emojis |

`/info steam` is unfinished: it validates and resolves a Steam ID, but doesn't reply yet.

## How it works

At startup, the bot loads every file in `src/commands/` and `src/events/`, then registers the commands globally with Discord. Each folder in `src/commands/` becomes a top-level slash command, and each file inside it becomes a subcommand.

To add a command, create a file in a category folder that exports a `Command`. It doesn't need registering anywhere else.

## Setup

You'll need Node.js 18 or later and a [Discord application](https://discord.com/developers/applications) with a bot user. In the Developer Portal, enable the **Server Members** and **Message Content** intents.

1. Install the dependencies:

   ```sh
   npm install
   ```

2. Create a `.env` file in the project root:

   ```sh
   TOKEN=your-discord-bot-token
   STEAM_API_KEY=your-steam-web-api-key
   ```

   `STEAM_API_KEY` is only used by `/info steam`.

3. Update `src/config.json` with your own emojis, role IDs, status messages and embed color. The emojis in the repo belong to the original server. `/info help` also has its own emoji ID in `src/commands/info/help.ts`.

4. Run the bot:

   ```sh
   npm run dev                # development, restarts on changes
   npm run build && npm start # production
   ```
