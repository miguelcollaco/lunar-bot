import { Command } from "../../structures/Command";
import {ApplicationCommandTypes, CommandInteraction, EmbedOptions, Guild } from "oceanic.js";
import { ClientType } from "../../typings/Client";
import { emojis, color } from "../../config.json";

module.exports = new Command({
    slash: {
        name: "oldest",
        type: ApplicationCommandTypes.CHAT_INPUT,
        description: "Shows the oldest discord account on the server"
    },
    run: async (client: ClientType, interaction: CommandInteraction): Promise<void> => {
        const guild = <Guild>client.guilds.get(<string>interaction.guildID);
        const user = guild.members
            .filter(u => !u.bot)
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];

        let embed: EmbedOptions = {
            title: emojis.arrow + "Oldest",
            description: `${user.mention} is the oldest discord account on **${guild.name}**!\n${emojis.bp}Creation Date: **${user.createdAt.toLocaleDateString("pt-PT")}**`,
            thumbnail: { url: user.avatarURL() },
            color: color,
        }

        await interaction.createMessage({ embeds: [embed] });
    }
});