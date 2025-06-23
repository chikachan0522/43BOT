import { Command, Option, register } from 'discord-hono'

const commands = [
  new Command('43', '43だよ.')
]

register(
  commands,
  process.env.DISCORD_APPLICATION_ID,
  process.env.DISCORD_TOKEN,
  //process.env.DISCORD_TEST_GUILD_ID,
)
