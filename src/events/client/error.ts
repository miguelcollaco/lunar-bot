import { ClientEvent } from "../../structures/Event";

module.exports = new ClientEvent("error", async (info: string | Error): Promise<void> => console.log(info));