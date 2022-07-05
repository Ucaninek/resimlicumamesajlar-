const Discord = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');

const config = require('./config.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

var onCooldown = new Set();

bot.once('ready', () => {
    console.log(chalk.redBright("#####") + ' ön hazırlık tamamlandı ' + chalk.redBright("#####"))
    console.log(`${chalk.bold(chalk.yellowBright(bot.user.tag))} olarak giriş yapıldı.`);
});

bot.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!bot.commands.has(command)) return;

    try {
        if (onCooldown.has(message.author.id)) return message.channel.send(new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Biraz sakin lütfen!')
            .setDescription(`Bu komutu kullanmak için birazcık beklemelisin c:`)
            .setFooter(`Varsayılan bekleme süresi: ${prefix.cooldown / 1000} saniye.`));
        else bot.commands.get(command).execute(message, args, bot);

        if (message.author.id == config.owner_id) return;
        onCooldown.add(message.author.id);
        setTimeout(function () { onCooldown.delete(message.author.id) }, config.cooldown);

    } catch (error) {
        console.error(error);
        message.channel.send(new Discord.MessageEmbed().setTitle(':x: olamaz! bu bir hata!').setColor('RED').setDescription('bunun birçok nedeni olabilir, hadi hayırlısı.\n\n' + `\`\`\`${error.message}\`\`\``))
    }
});

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
//bot.on("debug", (e) => console.info(e));

bot.login(config.token);

console.log(chalk.redBright("#####") + ' ön hazırlık başladı ' + chalk.redBright("#####"))
console.log(chalk.blueBright('komutlar ve eylemler kaydediliyor...'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
    if (command.aliases != undefined) {
        command.aliases.forEach(alias => {
            bot.commands.set(alias, command);
        });
    }
}

for (const file of eventFiles) {
    const eventHandler = require(`./events/${file}`);
    try {
        bot.on(eventHandler.event, eventArgs => { eventHandler.handle(eventArgs, bot); })
    } catch (error) {
        console.error(error);
        message.reply(`Bu eylem komutunu (\`\`\`${eventHandler.event}\`\`\`) oluştururken bir hata oluştu!`);
    }
}


console.log(`${chalk.greenBright("[+]")} ${chalk.grey(`${commandFiles.length} komut`)} kaydedildi.`);
console.log(`${chalk.greenBright("[+]")} ${chalk.grey(`${eventFiles.length} eylem`)} kaydedildi.`);