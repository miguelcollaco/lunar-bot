import { ClientEvent } from "../../structures/Event";
import { client } from "../../index";
import { activities_list } from "../../config.json";
import { ActivityTypes, ApplicationCommandTypes, CreateApplicationCommandOptions } from "oceanic.js";

module.exports = new ClientEvent("ready", async (): Promise<void> => {
	let i: number = 0;
	setInterval((): void => {
		client.editStatus("online", [{ name: activities_list[i++ % activities_list.length], type: ActivityTypes.WATCHING }]);
	}, 7500);

	let commands: CreateApplicationCommandOptions[] = [];
	for (const category of client.commands)
		commands.push({
			name: category[0],
			description: category[0],
			type: ApplicationCommandTypes.CHAT_INPUT,
			//@ts-ignore
			options: [...category[1].values()].map(c => c.slash)
		});

	await client.application.bulkEditGlobalCommands(commands)

	console.log(`${client.user.username} is online!`);
});