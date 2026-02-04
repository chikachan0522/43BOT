import { env } from "cloudflare:workers";
import { Button, Components, DiscordHono, _channels_$_messages, CommandContext } from 'discord-hono';

import type { GeminiApiResponse } from './types';


export interface Env {
	Variables: {
		AI_ACCOUNT_ID: string;
		CF_AIG_TOKEN: string;
	};
}

const app = new DiscordHono()
  .cron('43 * * * *', async c => {
		const res = await ai(prompt());
		await c.rest('POST', _channels_$_messages, ['1386038293891911700'], {
			content: `${res}`
		});
  })
  .cron('3 19 * * *', async c => {
		const res = await ai(prompt());
		await c.rest('POST', _channels_$_messages, ['1386038293891911700'], {
			content: `${res}`
		});
  })
  .command('43', async c => c.resDefer(async c => {
		const res = await ai(prompt());

		await c.followup(res);
	}))

const ai = async (args: string) => {
	const ACCOUNT_ID = env.AI_ACCOUNT_ID;
	const GATEWAY_ID = '43bot';
	const GEMINI_MODEL = 'gemini-3-pro-preview';

	const gatewayUrl = `https://gateway.ai.cloudflare.com/v1/${ACCOUNT_ID}/${GATEWAY_ID}/google-ai-studio/v1beta/models/${GEMINI_MODEL}:generateContent`;

	const response = await fetch(gatewayUrl, {
		method: 'POST',
		headers: {
			'cf-aig-authorization': `Bearer ${env.CF_AIG_TOKEN}`,
			'Contnet-Type': 'application/json'
		},
		body: JSON.stringify({
			contents: [
				{
					role: 'user',
					parts: [{ text: `${args}`}],
				},
			],
			generationConfig: {
				thinkingConfig: {
					thinkingLevel: 'high',
				},
			},
		}),
	});

	if (!response.ok) {
		const data = response.text();
		console.log(data);
		return data;
	}

	const data = await response.json() as GeminiApiResponse;

	return data.candidates[0].content.parts[0].text;
};

const prompt = () => {
	const now = new Date();

	const formatter = new Intl.DateTimeFormat('ja-JP', {
		timeZone: 'Asia/Tokyo',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});

	const parts = formatter.formatToParts(now);

	const year      = parts.find(p => p.type === 'year').value;
  const month     = parts.find(p => p.type === 'month').value;
  const day       = parts.find(p => p.type === 'day').value;
  const dayPeriod = parts.find(p => p.type === 'dayPeriod').value;
  const hour      = parts.find(p => p.type === 'hour').value;
  const minute    = parts.find(p => p.type === 'minute').value;

	return `今は${year}年${month}月${day}日 ${dayPeriod} ${hour}時${minute}分です。私は43という人物です。あなたは可愛いメスガキです。私に対して今の時間に関する慰めをしてください。`
}

export default app;
