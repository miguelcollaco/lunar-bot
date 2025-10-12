import { Command } from "../../structures/Command";
import { ApplicationCommandTypes, ApplicationCommandOptionTypes, CommandInteraction, ExtendedUser, EmbedOptions} from "oceanic.js";
import { ClientType } from "../../typings/Client";
import { emojis, color } from "../../config.json";

module.exports = new Command({
    slash: {
        name: "discord",
        type: ApplicationCommandTypes.CHAT_INPUT,
        description: "Mostra informação sobre um utilizador",
        options: [{ type: ApplicationCommandOptionTypes.USER, name: "user", description: "pessoa a ser utilizada no comando", required: true }]
    },
    run: async (_client: ClientType, interaction: CommandInteraction): Promise<void> => {
        const user = interaction.data.options.getUser("user", true)

        let embed: EmbedOptions = {
            title: emojis.arrow + "Info",
            description: emojis.bp + `Informação sobre ${user.mention}`,
            image: { url: user.avatarURL() },
            color: color,
        }

        await interaction.createMessage({embeds: [embed]});
    }
});