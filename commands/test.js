module.exports = {
    name: 'test',
    aliases: ['t'],
    description: 'Cuma mesajınızı test edin.',
    category: 'test',
    async execute(message, _args, bot) {

        const { MessageEmbed, MessageAttachment } = require('discord.js');
        const guildID = message.guild.id;

        const img = require('../utils/getRandomImage.js');
        const res = await img.get(bot);
        const attachment = new MessageAttachment('./tmp.png', res.fn);
        await message.channel.send(new MessageEmbed().setTitle(res.title).setDescription(res.description).setFooter(res.footer, res.footer2).setColor(res.color).attachFiles(attachment).setImage(res.attachment));

    }
};