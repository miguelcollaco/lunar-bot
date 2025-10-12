import { User, ImageFormats } from "oceanic.js";
import head from "axios";

export function random(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export async function sleep(ms: number): Promise<any> {
	return new Promise((res) => setTimeout(res, ms))
}

export async function getUserBannerUrl (user: User, dynamic: boolean, format: string, size: number): Promise<string> {
	if (![16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(size))
		throw new Error(`Size '${size}' not supported!`);

	if (!(format in ImageFormats))
		throw new Error(`Format '${format}' not supported!`);

	const baseUrl = `https://cdn.discordapp.com/banners/${user.id}/${user.banner}`;
	const query = `?size=${size}`;

	if (dynamic) {
		const { headers } = await head(baseUrl);
		if (headers && headers.hasOwnProperty("content-type"))
			return baseUrl + (headers["content-type"] == "image/gif" ? ".gif" : `.${format}`) + query;
	}
	return baseUrl + `.${format}` + query;
}

export function formatDiscordTime(time: number | Date, flag: "short-time" | "long-time" | "short-date" | "long-date" | "short-datetime" | "long-datetime" | "relative", ms: boolean = false) {
	if (time instanceof Date) {
		time = time.getTime();
		ms = true;
	}

	if (ms)
		time = Math.floor(time / 1000);

	const shortFlags = {
		"short-time":     "t",
		"long-time":      "T",
		"short-date":     "d",
		"long-date":      "D",
		"short-datetime": "f",
		"long-datetime":  "F",
		"relative":       "R"
	};
	return `<t:${time}:${shortFlags[flag]}>`;
}