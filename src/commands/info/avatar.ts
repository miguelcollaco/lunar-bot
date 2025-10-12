import { Command } from "../../structures/Command";
import {
    ApplicationCommandTypes,
    ApplicationCommandOptionTypes,
    CommandInteraction,
    Member,
    ImageFormats,
    EmbedOptions,
    TextableChannel
} from "oceanic.js";
import { ClientType } from "../../typings/Client";
import { emojis, color } from "../../config.json";

module.exports = new Command({
    slash: {
        name: "avatar",
        type: ApplicationCommandTypes.CHAT_INPUT,
        description: "Shows a user's avatar",
        options: [{ type: ApplicationCommandOptionTypes.USER, name: "user", description: "User whose avatar will be shown", required: true }]
    },
    run: async (client: ClientType, interaction: CommandInteraction): Promise<void> => {
        const member = <Member> await interaction.guild?.getMember(interaction.data.options.getUser("user", true).id);

        let formats: string[] = [];
        for (const format of ImageFormats)
            if (!(format == "gif" && member.user.avatarURL(format)))
                formats.push(`[${format.toUpperCase()}](${member.user.avatarURL(format)})`)

        let embed: EmbedOptions = {
            title: emojis.arrow + "Avatar",
            description: emojis.bp + `${member.mention}'s avatar\nAvailable formats: ${formats.join(" | ")}`,
            image: { url: member.user.avatarURL() },
            color: color,
        }

        await interaction.createMessage({ embeds: [embed] });

        if (member.avatar) {
            formats = [];
            for (const format of ImageFormats)
                if (!(format == "gif" && member.avatarURL(format)))
                    formats.push(`[${format.toUpperCase()}](${member.avatarURL(format)})`)

            embed = {
                description: emojis.bp + `${member.mention}'s avatar on **${interaction.guild?.name}**\nAvailable formats: ${formats.join(" | ")}`,
                image: { url: member.avatarURL() },
                color: color,
            }

            await (<TextableChannel> await client.rest.channels.get(interaction.channelID)).createMessage({ embeds: [embed] })
        }
    }
});