module.exports = {
    create(options) { //options: {date: ,  callback};
        if (options.date == undefined || options.callback == undefined) {
            throw new Error('wrong options');
        }

        var date = new Date();
        var millis = options.date - date;
        log(millis);
    }
}