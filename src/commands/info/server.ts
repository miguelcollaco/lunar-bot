import { Command } from "../../structures/Command";
import { ApplicationCommandTypes, CommandInteraction, EmbedOptions, Guild } from "oceanic.js";
import { ClientType } from "../../typings/Client";
import { color, emojis } from "../../config.json";
import { formatDiscordTime } from "../../util/functions";
import {
    DefaultMessageNotificationLevelNames,
    ExplicitContentFilterLevelNames,
    GuildNSFWLevelNames,
    MFALevelNames,
    PremiumTierNames,
    VerificationLevelNames
} from "../../util/names";

module.exports = new Command({
    slash: {
        name: "servidor",
        type: ApplicationCommandTypes.CHAT_INPUT,
        description: "Mostra informação sobre o servidor",
    },
    run: async (client: ClientType, interaction: CommandInteraction): Promise<void> => {
        const guild = <Guild>interaction.guild

        let embed: EmbedOptions = {
            title: emojis.arrow + "Informação sobre o servidor",
            description:
                `${emojis.bp} Nome: **${guild.name}**
                ${emojis.bp} ID: **${guild.id}**
                ${emojis.bp} Dono: <@${guild.ownerID}>
                ${emojis.bp} Data de Criação: **${formatDiscordTime(guild.createdAt, "long-date")}**
                ${emojis.bp} Boosts: **${guild.premiumSubscriptionCount || "Nenhum"}**${guild.premiumSubscriptionCount ? ` ( **${PremiumTierNames[guild.premiumTier]}** )` : ""}
                ${emojis.bp} Large: **${guild.large ? "Sim" : "Não"}**
                ${emojis.bp} Verificação: **${VerificationLevelNames[guild.verificationLevel]}**
                ${emojis.bp} 2FA: **${MFALevelNames[guild.mfaLevel]}**
                ${emojis.bp} Explicit Content Filter: **${ExplicitContentFilterLevelNames[guild.explicitContentFilter]}**
                ${emojis.bp} Notificações: **${DefaultMessageNotificationLevelNames[guild.defaultMessageNotifications]}**
                ${emojis.bp} Vanity URL: **${guild.features.includes("VANITY_URL") && guild.vanityURLCode !== null ? `[https://discord.gg/${guild.vanityURLCode}](https://discord.gg/${guild.vanityURLCode})` : "None"}**
                ${emojis.bp} NSFW: **${GuildNSFWLevelNames[guild.nsfwLevel]}**
                ${emojis.bp} Membros: **${guild.memberCount}**
                ${emojis.bp} Língua: **${guild.preferredLocale || "Nenhuma"}**
                ${emojis.bp} Limite de Membros: **${guild.maxMembers?.toLocaleString() || "Nenhum"}**`,
            thumbnail: { url: <string>guild.iconURL() },
            image: { url: <string>guild.bannerURL() },
            color: color,
        }

        await interaction.createMessage({embeds: [embed]});
    }
});