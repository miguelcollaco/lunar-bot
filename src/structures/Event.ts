import { ClientEvents } from "oceanic.js";

export class ClientEvent<Key extends keyof ClientEvents> {
    constructor(
        public event: Key,
        public run: (...args: ClientEvents[Key]) => void
    ) {}
}

export class CodeEvent<Key> {
    constructor(
        public event: Key,
        public run: (...args: any[]) => void
    ) {}
}