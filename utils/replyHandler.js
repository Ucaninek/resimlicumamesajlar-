module.exports = {
    create(channel, settings, filter, callback, expiredCallback = function() {}) {
        const config = require('../config.json')

        channel.awaitMessages(filter, settings)
            .then(collected => {
                callback(collected);
            }).catch(collected => {
                expiredCallback(collected);
            });
    }
}