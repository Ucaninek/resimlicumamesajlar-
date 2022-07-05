module.exports = {
    create(message, emojies, settings, getFilter, callback, expiredCallback = function () { }) {
        emojies.forEach(async emoji => {
            try {
                await message.react(emoji)
            } catch (err) { }
        });

        message.awaitReactions((reaction, user) => getFilter(user) && (emojies.includes(reaction.emoji.name)), settings)
            .then(collected => {
                callback(collected);
            });
    }
}