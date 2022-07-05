const { MessageEmbed } = require('discord.js');
const { send } = require('process');

module.exports = {
    name: 'kurulum',
    aliases: ['setup', 's'],
    description: 'Botun kurulumu yapar.',
    category: 'genel',
    cid: 0,
    roles: [],
    async execute(message, _args, bot) {
        const DB = require('simplest.db').JS0N;
        const db = new DB({
            path: './db.json' // .json or .sqlite
        });

        bot.on('message', (e_msg) => {
            if (e_msg.channel == message.channel && e_msg.author.id == message.author.id && hookMessages == true) {
                //if (e_msg.content == 'iptal') {
                //    hookMessages = false;
                //    return;
                //}
                e_msg.delete().catch({});
            }
        });

        var ecancel = false;

        const accent_color = 'WHITE';
        var hookMessages = false;

        const replyHandler = require('../utils/replyHandler.js');
        const reactionHandler = require('../utils/reactionHandler.js');
        const log = console.log;

        const rfilter = (reaction, user) => {
            return reaction.emoji.name === '🛐' && user.id === message.author.id;
        };

        const filter = (msg) => {
            return msg.author.id == message.author.id;
        };

        var msg = await message.channel.send(new MessageEmbed().setTitle('Cuma Mesajları Kurulum').setDescription(`kurulum için birkaç ayar yapılacak. bu süre zarfında bu kanala (#${message.channel.name}) attığın her mesaj silinecek. kurulumu iptal etmek için \`iptal\` yazabilirsin. başlamak için aşağıdaki emojiye tıkla. (bunu yapmak için 30 saniyen var)`).setThumbnail(bot.user.displayAvatarURL()).setColor(accent_color));
        msg.react('🛐');
        msg.awaitReactions(rfilter, { max: 1, time: 30000, errors: ['time'] })
            .then(async collected => {
                msg.reactions.removeAll();
                msg = await msg.edit(new MessageEmbed().setTitle('Kurulum - 1 / 2').setDescription('Şimdi cuma mesajının hangi kanala yollanacağını belirt (kanalı etiketlemen yeterli)').setThumbnail(bot.user.displayAvatarURL()).setColor(accent_color));
                hookMessages = true;
                msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(async collected => {
                        //collected.first().delete();
                        if (collected.first().content == 'iptal') {
                            cancel(msg);
                            return;
                        }
                        if (isParsedValidChannel(collected.first().content) == false) {
                            var cid = await getChannel();
                            if (cid == "cancelled") return;
                            else this.cid = cid;

                        } else {
                            this.cid = collected.first().content;
                        }
                        msg = await msg.edit(new MessageEmbed().setTitle('Kurulum - 2 / 2').setDescription('şimdi cuma mesajının kimi etiketleyeceğini belirt ve rolleri virgülle ayır. (babaanneleri seçmeye dikkat et) (`@everyone` yerine `everyone`\'ı kullanabilirsin.)').setColor(accent_color));
                        msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                            .then(async collected => {
                                if (collected.first().content == 'iptal') {
                                    cancel(msg);
                                    return;
                                }
                                this.roles = getRoles(collected.first().content);
                                hookMessages = false;
                                db.set(message.guild.id, { channelID: this.cid.replace('#', '').replace('<', '').replace('>', ''), roles: this.roles });
                                msg.edit(new MessageEmbed().setColor('GREEN').setThumbnail(bot.user.displayAvatarURL()).setTitle('✅ Kurulum tamamlandı.').setDescription(`test etmek için test komunutu kullan.\n\nCHANNEL=${this.cid}\nPINGS=${this.roles.toString()}`));
                            }).catch(err => {
                                msg.reactions.removeAll();
                                console.error(err);
                                timeout(msg);
                            });
                    }).catch(err => {
                        msg.reactions.removeAll();
                        console.error(err);
                        timeout(msg);
                    });
            }).catch(err => {
                msg.reactions.removeAll();
                console.error(err);
                timeout(msg);
            });


        function isParsedValidChannel(content) {
            var tmp = "";
            if (content.startsWith('<#') && content.endsWith('>')) {
                tmp = content.replace('<#', '').replace('>', '');
                return isValidChannel(tmp);
            } else return isValidChannel(content);
        }

        function isValidChannel(id) {
            return message.guild.channels.cache.find(c => c.id == id) ? true : false;
        }

        async function getChannel() {
            return new Promise(async (resolve, reject) => {
                if (ecancel) return resolve('cancelled');
                msg = await msg.edit(new MessageEmbed().setTitle('Kurulum - 1 / 2').setDescription('[böyle bir kanal yok ??] şimdi cuma mesajının hangi kanala yollanacağını belirt (kanalı etiketlemen yeterli)').setThumbnail(bot.user.displayAvatarURL()).setColor('RANDOM'));
                msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(async collected => {
                        //collected.first().delete();
                        if (collected.first().content == 'iptal') {
                            cancel(msg);
                            return resolve('cancelled');
                        }
                        if (isParsedValidChannel(collected.first().content) == false) {
                            //just incase the bastard user sends an invalid channel
                            return resolve(await getChannel());
                        } else {
                            return resolve(collected.first().content.replace('<#', '').replace('>', ''));
                        }
                    }).catch(err => {
                        msg.reactions.removeAll();
                        console.error(err);
                        timeout(msg);
                    });
            });
        }

        function cancel(msg) {
            msg.edit(new MessageEmbed().setColor('RED').setTitle('❌ Kurulum iptal edildi.').setDescription('her zaman tekrar başlayabilirsin ¯\\_(ツ)_/¯'));
            hookMessages = false;
            ecancel = true;
        }

        function timeout(msg) {
            msg.edit(new MessageEmbed().setTitle('⏰ İstek zaman aşımına uğradı [TIMED_OUT]').setDescription('bir dahakine daha hızlı olmayı dene 😓..'));
            hookMessages = false;
            ecancel = true;
        }

        function getRoles(str) {
            var s = str.split(',');
            s.forEach((item, index) => {
                if (item == "everyone") s[index] = "@everyone";
            });
            return s;
        }

    }
};