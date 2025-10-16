import { Command } from "../../structures/Command";
import { ApplicationCommandTypes, CommandInteraction, EmbedOptions, Constants } from "oceanic.js";
import { ClientType } from "../../typings/Client";
import { emojis, color } from "../../config.json";

module.exports = new Command({
    slash: {
        name: "developer",
        type: ApplicationCommandTypes.CHAT_INPUT,
        description: "Shows the bot's developer"
    },
    run: async (client: ClientType, interaction: CommandInteraction): Promise<void> => {
        let embed: EmbedOptions = {
            title: emojis.arrow + "Developer",
            description: "This Discord bot was made with :heart: by **</MICO>**",
            fields: [
                { inline: true, name: emojis.bp + "Discord", value: "<@391706038698508299>"},
                { inline: true, name: emojis.bp + "Steam", value: "[(Click Here)](http://steamcommunity.com/profiles/76561198985255524)"},
                { inline: true, name: emojis.bp + "Website", value: "[(Click Here)](https://miguelcollaco.com)"}
            ],
            color: color,
        }
        await interaction.createMessage({embeds: [embed]});
    }
});