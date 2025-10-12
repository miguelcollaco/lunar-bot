import { Command } from "../../structures/Command";
import { ApplicationCommandTypes, CommandInteraction, EmbedOptions } from "oceanic.js";
import { ClientType } from "../../typings/Client";
import { emojis, color } from "../../config.json"
import { random } from "../../util/functions";

module.exports = new Command({
    slash: {
        name: "magic8ball",
        type: ApplicationCommandTypes.CHAT_INPUT,
        description: "Escreve a tua mensagem com emojis",
        options: [{ type: 3, name: "question", description: "the question", required: true, maxLength: 500 }]
    },
    run: async (_client: ClientType, interaction: CommandInteraction): Promise<void> => {
        const question = interaction.data.options.getString("question", true);
        console.log(question);
        
        let answers = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy, try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
        for (let i = answers.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[rand]] = [answers[rand], answers[i]]
        }

        let embed: EmbedOptions = {
            title: emojis.arrow + "8Ball",
            description: `${emojis.bp}<@${interaction.member?.id}>**'s question:**\n\`${question}\`\n${emojis.bp}**My answer**\n\`${answers[random(0,answers.length-1)]}\``,
            color: color,
        }

        await interaction.createMessage({ embeds: [embed] });
    }
});