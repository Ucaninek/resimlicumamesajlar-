module.exports = {
    name: 'test',
    aliases: ['t'],
    description: 'Cuma mesajınızı test edin.',
    category: 'test',
    async execute(message, _args, bot) {

        const { MessageEmbed, MessageAttachment } = require('discord.js');
        const DB = require('simplest.db').JS0N;
        const db = new DB({
            path: './db.json' // .json or .sqlite
        });

        const img = require('../utils/getRandomImage.js');
        const res = await img.get(bot);
        const attachment = new MessageAttachment('./tmp.png', res.fn);
        const guildID = message.guild.id;
        if (db.get(guildID) != undefined) {
            const cid = db.get(`${guildID}.channelID`);
            await message.guild.channels.cache.get(cid).send(new MessageEmbed().setTitle(res.title).setDescription(res.description).setFooter(res.footer, res.footer2).setColor(res.color).attachFiles(attachment).setImage(res.attachment));
        } else {
            await message.channel.send(new MessageEmbed().setTitle('vah vah!..').setDescription('görünüşe göre botu kurmamışsın. yazık kafana...'));
            await message.channel.send(new MessageEmbed().setTitle(res.title).setDescription(res.description).setFooter(res.footer, res.footer2).setColor(res.color).attachFiles(attachment).setImage(res.attachment));
        }

    }
};