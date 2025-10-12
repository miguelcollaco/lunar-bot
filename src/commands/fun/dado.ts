import { Command } from "../../structures/Command";
import { ApplicationCommandTypes, CommandInteraction, EmbedOptions } from "oceanic.js";
import { ClientType } from "../../typings/Client";
import { emojis, color } from "../../config.json"
import { random } from "../../util/functions";

module.exports = new Command({
    slash: {
        name: "dice",
        type: ApplicationCommandTypes.CHAT_INPUT,
        description: "Rolls a dice"
    },
    run: async (_client: ClientType, interaction: CommandInteraction): Promise<void> => {
        let embed: EmbedOptions = {
            title: emojis.arrow + "Dice",
            description: `\n${emojis.bp}<@${interaction.member?.id}> rolled the dice and it landed on **${random(1,6)}**`,
            color: color,
            thumbnail: { url: "https://media.tenor.com/i_L5KauoCcoAAAAi/dice.gif" },
        }
        await interaction.createMessage({ embeds: [embed] });
    }
});