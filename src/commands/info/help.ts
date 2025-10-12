import { Command } from "../../structures/Command";
import {
    ApplicationCommandTypes,
    CommandInteraction,
    MessageActionRow,
    ComponentTypes,
    EmbedOptions,
    SelectOption,
    Message,
    ComponentInteraction,
    MessageFlags,
} from "oceanic.js";
import { ClientType } from "../../typings/Client";
import { CommandType } from "../../typings/Command";
import { emojis, color } from "../../config.json";
import { InteractionCollector } from "../../util/InteractionCollector"

module.exports = new Command({
    slash: {
        name: "help",
        type: ApplicationCommandTypes.CHAT_INPUT,
        description: "Shows all available commands",
    },
    run: async (client: ClientType, interaction: CommandInteraction): Promise<void> => {
        let component: MessageActionRow = {
            type: ComponentTypes.ACTION_ROW,
            components: [{
                type: ComponentTypes.STRING_SELECT,
                placeholder: "Category",
                customID: "category",
                options: [...client.commands.keys()].map(c => <SelectOption>{
                    label: c,
                    value: c,
                    emoji: {
                        name: "arrow",
                        id: "1000863355008983041"
                    }
                })
            }]
        };

        let embed: EmbedOptions = {
            title: emojis.arrow + "Help",
            description: "Choose a category!",
            color: color,
        }

        await interaction.createMessage({embeds: [embed], components: [component]});
        const message: Message = await interaction.getOriginal();

        const collector = new InteractionCollector(client, message, { maxTime: 15000 });

        collector.on("interaction", async (cInteraction: ComponentInteraction<ComponentTypes.STRING_SELECT>) => {
            collector.resetTime();
            if (cInteraction.user.id != interaction.user.id) {
                let embed: EmbedOptions = {
                    description: emojis.bp + `You cannot interact with <@${cInteraction.user.id}>'s message!`,
                    color: color,
                }
                return await cInteraction.createMessage({ embeds: [embed], flags: MessageFlags.EPHEMERAL });
            }

            const category = cInteraction.data.values.raw[0];
            const commands = <Map<string, CommandType>>client.commands.get(category)
            embed.title = emojis.arrow + "Help / " + category,
            embed.description = ""
            for (let command of commands.values()){
                embed.description += `${emojis.bp}**${command.slash.name}** - ${command.slash.description}\n`;}
            await message.edit({ embeds: [embed]})
            collector.resetTime();
        })

        collector.on("end", (_collected: any[], _reason: string): void => {
            component.components[0].disabled = true;
            message.edit({ components: [component] })
        })
    }
});