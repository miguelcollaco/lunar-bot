import { Message, ComponentInteraction } from "oceanic.js";
import { ClientType } from "../typings/Client";

const EventEmitter = require('events').EventEmitter;

/**
 * An extremely simple and pretty straight forward interaction collector for Oceanic.js
 */
export class InteractionCollector extends EventEmitter {
    constructor(client: ClientType, message: Message, options: { filter?: (_: ComponentInteraction) => boolean, maxTime?: number, maxMatches?: number } = {}) {
        super();

        this.client     = client;
        this.filter     = options.filter;
        this.message    = message;
        this.options    = options;
        this.ended      = false;
        this.collected  = [];
        this.listener   = (interaction: ComponentInteraction) => this.processInteraction(interaction);

        this.timeout    = undefined;
        if (options.maxTime)
            this.timeout = setTimeout(() => this.stopListening('timeEnd'), options.maxTime);

        this.client.on('interactionCreate', this.listener);
    }

    /**
     * Verifies a interaction for its validity with the provided filter and if the maximum number of interactions has been reached
     * @param {object} interaction The interaction object
     */
    private async processInteraction(interaction: ComponentInteraction): Promise<void> {
        if (this.message.id !== interaction.message.id) return;

        await interaction.deferUpdate();

        if (this.options.filter) {
            if (!this.filter(interaction)) return;
            this.collected.push(interaction);
            this.emit('interaction', interaction);
        } else {
            this.collected.push(interaction);
            this.emit('interaction', interaction);
        }

        if (this.collected.length >= this.options.maxMatches) {
            this.stopListening('maxInteractions');
            return;
        }
    }

    /**
     * Stops collecting interactions and removes the listener from the client
     * @param {string} reason The reason for stopping
     */
    private stopListening(reason: string): void {
        if (this.ended) return;
        this.ended = true;
        this.client.removeListener('interactionCreate', this.listener);
        this.emit('end', this.collected, reason);
    }

    resetTime() {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.stopListening('timeEnd'), this.options.maxTime);
    }
}