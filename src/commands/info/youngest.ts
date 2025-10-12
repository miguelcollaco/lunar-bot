import { Command } from "../../structures/Command";
import {ApplicationCommandTypes, CommandInteraction, EmbedOptions, Guild } from "oceanic.js";
import { ClientType } from "../../typings/Client";
import { emojis, color } from "../../config.json";

module.exports = new Command({
    slash: {
        name: "youngest",
        type: ApplicationCommandTypes.CHAT_INPUT,
        description: "Shows the youngest discord account on the server",
        options: []
    },
    run: async (client: ClientType, interaction: CommandInteraction): Promise<void> => {
        const guild = <Guild>client.guilds.get(<string>interaction.guildID);
        const user = guild.members
            .filter(u => !u.bot)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

        let embed: EmbedOptions = {
            title: emojis.arrow + "Youngest",
            description: `${user.mention} is the youngest discord account on **${guild.name}**!\n${emojis.bp}Creation date: **${user.createdAt.toLocaleDateString("pt-PT")}**`,
            thumbnail: { url: user.avatarURL() },
            color: color,
        }

        await interaction.createMessage({ embeds: [embed] });
    }
});