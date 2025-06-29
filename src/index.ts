import { Button, Components, DiscordHono, _channels_$_messages } from 'discord-hono'

const app = new DiscordHono()
  .cron('43 * * * *', async c => {
	await c.rest('POST', _channels_$_messages, ['1386038293891911700'], {
		content: '43だよ.'
	})
  })
  .cron('3 19 * * *', async c => {
	await c.rest('POST', _channels_$_messages, ['1386038293891911700'], {
		content: '43だよ.'
	})
  })
  .command('43', c => c.res('43だよ.'))

export default app
