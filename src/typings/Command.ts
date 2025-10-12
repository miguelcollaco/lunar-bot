import { ClientType } from "./Client";
import { ApplicationCommandOptions, ApplicationCommandTypes, CommandInteraction } from "oceanic.js";

export type CommandType = {
    perms?: string[],
    slash: {
        name: string,
        type: ApplicationCommandTypes,
        description: string,
        options?: ApplicationCommandOptions[],
    }
    run: (client: ClientType, interaction: CommandInteraction) => void;
};