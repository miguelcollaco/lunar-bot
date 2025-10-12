import { ClientEvent } from "../../structures/Event";
import {
    AnyInteractionGateway,
    CommandInteraction,
    EmbedOptions,
    InteractionTypes,
    MessageFlags
} from "oceanic.js";
import { CommandType } from "../../typings/Command";
import { client } from "../../index";
import { color, emojis } from "../../config.json";

module.exports = new ClientEvent("interactionCreate", async (interaction: AnyInteractionGateway): Promise<void> => {
    switch (interaction.type) {
        case InteractionTypes.APPLICATION_COMMAND:
            const command: CommandType | undefined = (client.commands.get(interaction.data.name))?.get(interaction.data.options.raw[0].name);
            if (command)
                if (command.perms && !interaction.member?.roles.filter(roleID => command.perms?.includes(roleID))) {
                    let embed: EmbedOptions = {
                        description: emojis.bp + "You don't have permission to use this command!",
                        color: color,
                    }
                    await interaction.createMessage({embeds: [embed], flags: MessageFlags.EPHEMERAL});
                } else
                    command.run(client, interaction)
            break;
    }
});