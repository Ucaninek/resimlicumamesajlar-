module.exports = {
    name: 'ping',
    description: 'Botun gecikme süresini gösterir.',
    category: 'genel',
    execute(message, _args, _bot) {

        const { MessageEmbed } = require('discord.js');

        message.channel.send('**Ping** Hesaplanıyor :ping_pong:').then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            let color = 'GREEN';
            if (ping > 300) color = 'RED';
            else if (ping > 100) color = 'YELLOW';
            msg.edit(new MessageEmbed().setColor(color).setTitle(':ping_pong: Pong!').setDescription(`${ping}ms`));
        });
    }
};