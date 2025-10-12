import { Command } from "../../structures/Command";
import {
	Constants,
	CommandInteraction,
	EmbedOptions,
	ApplicationCommandOptionTypes,
	MessageFlags
} from "oceanic.js";
import { ClientType } from "../../typings/Client";
import { emojis, color } from "../../config.json";
import { isSteamID, toSteamID64, fromSteamID3, isSteamID3, isSteamID64 } from "steamidutils";

module.exports = new Command({
	slash: {
		name: "steam",
		type: Constants.ApplicationCommandTypes.CHAT_INPUT,
		description: "Mostra informação sobre um perfil STEAM",
		options: [
			{ type: ApplicationCommandOptionTypes.STRING, name: "mode", description: "search mode", choices: [
				{ name: "CUSTOM URL", value: "vanity" }, { name: "SteamID", value: "steamid" }, { name: "SteamID64", value: "steamid64" }, { name: "SteamID3", value: "steamid3" }
			], required: true },
			{ type: ApplicationCommandOptionTypes.STRING, name: "value", description: "pessoa a ser utilizada no comando", required: true }
		]
	},
	run: async (_client: ClientType, interaction: CommandInteraction): Promise<void> => {
		const mode = interaction.data.options.getString("mode", true);
		let value = interaction.data.options.getString("value", true);

		switch (mode) {
			case "vanity":
				const res = (await (await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_API_KEY}&vanityurl=${value}`)).json()).response
				if (res.success != 1) {
					let embed: EmbedOptions = {
						description: emojis.bp + `Invalid custom URL! (\`${value}\`)`,
						color: color,
					};
					await interaction.createMessage({embeds: [embed], flags: MessageFlags.EPHEMERAL});
					return;
				}
				value = res.steamid;
				break;
			case "steamid64":
				if (!isSteamID64(value)) {
					let embed: EmbedOptions = {
						description: emojis.bp + `Invalid SteamID64! (\`${value}\`)`,
						color: color,
					};
					await interaction.createMessage({embeds: [embed], flags: MessageFlags.EPHEMERAL});
					return;
				}
				break;
			case "steamid":
				if (!isSteamID(value)) {
					let embed: EmbedOptions = {
						description: emojis.bp + `Invalid SteamID! (\`${value}\`)`,
						color: color,
					};
					await interaction.createMessage({embeds: [embed], flags: MessageFlags.EPHEMERAL});
					return;
				} else
					value = toSteamID64(value);
				break
			case "steamid3":
				if (!isSteamID3(value)) {
					let embed: EmbedOptions = {
						description: emojis.bp + `Invalid SteamID3! (\`${value}\`)`,
						color: color,
					};
					await interaction.createMessage({embeds: [embed], flags: MessageFlags.EPHEMERAL});
					return;
				} else
					value = toSteamID64(fromSteamID3(value));
				break;
		}

		console.log(value);
		
	}
});