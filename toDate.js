module.exports = function toDate(date0, force) {
    if (!date0 && !force) return date0
    if (typeof date0 === 'string') {
        var m = /(\d+)([\-\/])(\d+)\2(\d+)$/.exec(date0)
        if (m) { //2022-02-02 变成 2022-02-02 08:00:00的问题
            return new Date(m[1], m[3] - 1, m[4])
        }
        var d = new Date(date0);
        if (!isNaN(d)) return d
        date0 = date0.replace(/(:\d+)\.\d+\S*$/, '$1'); //IE 不能转换2021-03-29T19:46:38.2867936+08:00
    }
    return new Date(date0);
}
