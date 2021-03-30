module.exports = function toDate(date0, force) {
    if (!date0 && !force) return date0
    if (typeof date0 === 'string') {
        var d = new Date(date0);
        if (!isNaN(d)) return d
        date0 = date0.replace(/(:\d+)\.\d+\S*$/, '$1'); //IE 不能转换2021-03-29T19:46:38.2867936+08:00
    }
    return new Date(date0);
}
