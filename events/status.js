module.exports = {
    event: 'ready',
    handle(_e, bot) {
        const config = require('../config.json');
        bot.user.setActivity(`${config.prefix}yardım - şimdiden hayırlı cumalar efenim`);
    }
};