import { Client } from "oceanic.js";
import { CommandType } from "./Command";

export type ClientType = Client & {
    commands: Map<string, Map<string, CommandType>>;
};