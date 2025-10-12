import {
	VerificationLevels,
	PremiumTiers,
	MFALevels,
	ExplicitContentFilterLevels,
	DefaultMessageNotificationLevels,
	GuildNSFWLevels
} from "oceanic.js";

export const VerificationLevelNames = {
	[VerificationLevels.NONE]:		"None",
	[VerificationLevels.LOW]:		"Low",
	[VerificationLevels.MEDIUM]:	"Medium",
	[VerificationLevels.HIGH]:		"High",
	[VerificationLevels.VERY_HIGH]:	"Very High"
} satisfies Record<VerificationLevels, string>;

export const PremiumTierNames = {
	[PremiumTiers.NONE]:	"Nenhum",
	[PremiumTiers.TIER_1]:	"Nível 1",
	[PremiumTiers.TIER_2]:	"Nível 2",
	[PremiumTiers.TIER_3]:	"Nível 3"
} satisfies Record<PremiumTiers, string>;

export const MFALevelNames = {
	[MFALevels.NONE]:		"None",
	[MFALevels.ELEVATED]:	"Required"
} satisfies Record<MFALevels, string>;

export const ExplicitContentFilterLevelNames = {
	[ExplicitContentFilterLevels.DISABLED]:					"Desativado",
	[ExplicitContentFilterLevels.MEMBERS_WITHOUT_ROLES]:	"Membros Sem Cargos",
	[ExplicitContentFilterLevels.ALL_MEMBERS]:				"Todos Os Membros"
} satisfies Record<ExplicitContentFilterLevels, string>;

export const DefaultMessageNotificationLevelNames = {
	[DefaultMessageNotificationLevels.ALL_MESSAGES]:	"Todas As Mensagens",
	[DefaultMessageNotificationLevels.ONLY_MENTIONS]:	"Apenas Menções",
	[DefaultMessageNotificationLevels.NO_MESSAGES]:		"No Messages",
	[DefaultMessageNotificationLevels.NULL]:			"Padrão"
} satisfies Record<DefaultMessageNotificationLevels, string>;

export const GuildNSFWLevelNames = {
	[GuildNSFWLevels.DEFAULT]:        "Padrão",
	[GuildNSFWLevels.EXPLICIT]:       "Explícito",
	[GuildNSFWLevels.SAFE]:           "Seguro",
	[GuildNSFWLevels.AGE_RESTRICTED]: "Age Restricted"
} satisfies Record<GuildNSFWLevels, string>;