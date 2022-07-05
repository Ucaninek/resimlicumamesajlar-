module.exports = {
    get(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}