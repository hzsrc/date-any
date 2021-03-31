var toDate = require('./toDate.js')
module.exports = function formatDate(date0, format) {
    var date = toDate(date0, 1);
    if (isNaN(date)) return date0 || ''
    if (!format) format = 'yyyy-MM-dd';
    var year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
    var hour = date.getHours(), minute = date.getMinutes(), second = date.getSeconds();
    var str = format.replace('yyyy', year).replace('yy', year.toString().slice(2));
    str = toTx(str, 'M', month);
    str = toTx(str, 'd', day);
    str = toTx(str, 'H', hour);
    str = toTx(str, 'm', minute, 1);
    str = toTx(str, 's', second, 1);
    return str;

    //同时支持MM和M，比如：03月和3月
    function toTx(str, find, to, force2) {
        var w2 = '0' + to;
        if (w2.length > 2) w2 = to
        var w1 = force2 ? w2 : to.toString().replace(/^0/, '');
        return str.replace(find + find, w2).replace(find, w1);
    }
}
