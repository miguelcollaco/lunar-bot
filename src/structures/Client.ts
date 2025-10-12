import { Client, Intents } from "oceanic.js";
import { CommandType } from "../typings/Command";
import { client } from "../index";
const { readdir } = require('fs').promises;
const dotenv = require('dotenv');
dotenv.config();

export class ExtendedClient extends Client {
    commands: Map<string, Map<string, CommandType>> = new Map;

    constructor() {
        super({
            auth: process.env.TOKEN,
            gateway: {
                intents: [Intents.GUILDS, Intents.GUILD_MEMBERS, Intents.GUILD_MESSAGES, Intents.MESSAGE_CONTENT, Intents.GUILD_VOICE_STATES]
            }
        });
    }

    async start(): Promise<void> {
        await this.registerModules();
        await this.connect();
    }

    async registerModules(): Promise<void> {
        // Commands
        for (const dir of await readdir(`${__dirname}/../commands/`)) {
            let commands: Map<string, CommandType> = new Map;
            for (const file of await readdir(`${__dirname}/../commands/${dir}`)) {
                let command = (await import(`${__dirname}/../commands/${dir}/${file}`)).default;
                commands.set(command.slash.name, command);
                console.log("Loaded command: " + command.slash.name);
            }
            client.commands.set(dir, commands)
        }

        // Events
        for (const dir of await readdir(`${__dirname}/../events/`))
            for (const file of await readdir(`${__dirname}/../events/${dir}`)) {
                let event = (await import(`${__dirname}/../events/${dir}/${file}`)).default;
                client.addListener(event.event, event.run);
                console.log(`Loaded ${dir} event: ${event.event}`);
            }
    }
}