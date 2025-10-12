import { Command } from "../../structures/Command";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, CommandInteraction } from "oceanic.js";
import { ClientType } from "../../typings/Client";

module.exports = new Command({
    slash: {
        name: "emojify",
        type: ApplicationCommandTypes.CHAT_INPUT,
        description: "Writes your message with emojis",
        options: [{ type: ApplicationCommandOptionTypes.STRING, name: "message", description: "message to be written with emojis", required: true, maxLength: 2000 }]
    },
    run: async (_client: ClientType, interaction: CommandInteraction): Promise<void> => {
        const input = interaction.data.options.getString("message", true).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        let msg = "";
        for (let i = 0; i < input.length; i++) {
            let char = input.charAt(i);
            if (char.toLowerCase() != char.toUpperCase())
                msg += `:regional_indicator_${char.toLowerCase()}:`;
            else if (char == " ")
                msg += " ";
            else if (!isNaN(<number><unknown>char))
                msg += `:${["zero","one","two","three","four","five","six","seven","eight","nine"][<number><unknown>char]}:`;
            else if (char == "#")
                msg += ":hash:";
            else if (char == "!")
                msg += ":grey_exclamation:";
            else if (char == "?")
                msg += ":grey_question:";
            else
                msg += char;
        }

        await interaction.createMessage({ content: msg });
    }
});