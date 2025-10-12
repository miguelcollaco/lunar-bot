import { Command } from "../../structures/Command";
import {
    ApplicationCommandTypes,
    CommandInteraction,
    Member,
    EmbedOptions,
    ApplicationCommandOptionTypes,
    MessageFlags,
    ImageFormats,
} from "oceanic.js";
import { ClientType } from "../../typings/Client";
import { emojis, color } from "../../config.json";
import { client } from "../..";

module.exports = new Command({
    slash: {
        name: "banner",
        type: ApplicationCommandTypes.CHAT_INPUT,
        description: "Shows a user's banner",
        options: [{ type: ApplicationCommandOptionTypes.USER, name: "user", description: "User whose banner will be shown", required: true }]
    },
    run: async (_client: ClientType, interaction: CommandInteraction): Promise<void> => {
        const user = await client.rest.users.get(interaction.data.options.getUser("user", true).id);
        
        if (!user.banner) {
            let embed: EmbedOptions = {
                description: emojis.bp + `${user.mention} has no banner!`,
                color: color,
            }
            return await interaction.createMessage({ embeds: [embed], flags: MessageFlags.EPHEMERAL });
        }

        let formats: string[] = [];
        for (const format of ImageFormats)
            if (!(format == "gif" && user.bannerURL(format)))
                formats.push(`[${format.toUpperCase()}](${user.bannerURL(format)})`)

        let embed: EmbedOptions = {
            title: emojis.arrow + "Banner",
            description: emojis.bp + `${user.mention}'s banner\nAvailable formats: ${formats.join(" | ")}`,
            footer: { text: "PS: Discord API does not support guild banners yet"},
            image: { url: <string>user.bannerURL() },
            color: color,
        }

        await interaction.createMessage({ embeds: [embed] });
    }
});