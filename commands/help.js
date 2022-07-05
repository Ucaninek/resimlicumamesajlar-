module.exports = {
    name: 'yardım',
    description: 'Tüm komutları gösterir.',
    category: 'genel',
    aliases: ['help'],
    execute(message, args, bot) {

        const { MessageEmbed } = require('discord.js');
        const config = require('../config.json');
        const firstLetterUppercase = require('../utils/firstLetterUppercase.js');

        var categories = [];

        bot.commands.forEach(command => {
            if (command.category == undefined) command.category = "belirtilmemiş";
            if (!categories.includes(command.category)) categories.push(command.category);
        });

        function listCategories() {
            var temp = '';

            categories.forEach(category => {
                temp += `${firstLetterUppercase.get(category)}: \`${config.prefix}${module.exports.name} ${category.toLowerCase()}\`\n`;
            });

            let embed = new MessageEmbed().setTitle(`Yardım Kategorileri - ${config.name}`).setDescription(temp).setColor('GREEN');
            return message.channel.send(embed);
        }

        if (args[0] == undefined) {
            listCategories();
        } else {

            var requestedCategory = args[0].toLowerCase();
            let temp = '';
            let done = [];
            if (categories.includes(requestedCategory) == false) {
                return listCategories();
            }
            bot.commands.forEach(command => {
                if (command.category == requestedCategory) {
                    if (done.includes(command.name) == false) {
                        temp += `\`${config.prefix}${command.name}\` : ${command.description}\n`
                        done.push(command.name);
                    }
                }
            });
            let embed = new MessageEmbed().setTitle(`${firstLetterUppercase.get(requestedCategory)} - Yardım`).setDescription(temp).setColor('GREEN');
            return message.channel.send(embed);
        }

    }
};