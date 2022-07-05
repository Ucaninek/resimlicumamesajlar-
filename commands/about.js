module.exports = {
    name: 'hakkında',
    aliases: ['about'],
    description: 'Bot hakkındaki bilgileri gösterir.',
    category: 'genel',
    execute(message, _args, bot) {
        const config = require('../config.json');
        const { MessageEmbed } = require('discord.js');
        message.channel.send(new MessageEmbed().setTitle(`${config.name} • ${config.owner}`).setDescription('develer tellal iken, pireler berber iken, canım sıkıldı. ve bu botu yapmaya karar verdim çünkü cuma mesajlarını 65 yaş+ teyzeler hariç kimse sevmez.').setThumbnail(bot.user.displayAvatarURL()));
    }
};