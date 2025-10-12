import { Command } from "../../structures/Command";
import {
    ApplicationCommandTypes,
    ApplicationCommandOptionTypes,
    CommandInteraction,
    EmbedOptions,
} from "oceanic.js";
import { ClientType } from "../../typings/Client";
import { emojis, color } from "../../config.json";
import { random } from "../../util/functions"

module.exports = new Command({
    slash: {
        name: "penis",
        type: ApplicationCommandTypes.CHAT_INPUT,
        description: "Mostra o tamanho do pénis de alguém",
        options: [{ type: ApplicationCommandOptionTypes.USER, name: "user", description: "pessoa a ser utilizada no comando", required: true }]
    },
    run: async (_client: ClientType, interaction: CommandInteraction): Promise<void> => {
        const user = interaction.data.options.getUser("user", true)

        let embed: EmbedOptions = {
            title: emojis.arrow + "Pénis",
            description: `Olha só o pénis de <@${user.id}>    :flushed:\n**8${"=".repeat(random(1,16))}D**`,
            thumbnail: { url: user.avatarURL() },
            color: color,
        }

        await interaction.createMessage({embeds: [embed]});
    }
});