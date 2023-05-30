var formatDate = require('./formatDate.js');

function DateAny(format) {
    if (!format) format = 'yyyy-MM-dd';
    var regStr = format.replace(/([\-\\\?\(\)\{\}\[\]\^\$\+\.\*])/g, '\\$1'); //特殊符号转义
    var group = {}, index = 1, reg;
    regStr = regStr.replace(/(dd?|yyyy|yy|MM?|HH?|mm?|ss?)/g, function (m) {
        switch (m) {
            case 'd':
            case 'dd':
                group.day = index++;
                return '(\\d{1,2})'
            case 'yyyy':
            case 'yy':
                group.year = index++;
                return '(\\d{' + m.length + '})'
            case 'M':
            case 'MM':
                group.month = index++;
                return '(\\d{1,2})'
            case 'H':
            case 'HH':
                group.hour = index++;
                return '(\\d{1,2})'
            case 'm':
            case 'mm':
                group.minute = index++;
                return '(\\d{1,2})'
            case 's':
            case 'ss':
                group.second = index++;
                return '(\\d{1,2})'
        }
        return m;
    });
    try {
        reg = new RegExp(regStr);
    } catch (e) {
        reg = /^(\d{4}|\d{1,2})([-\/\.])(\d{1,2})\2(\d{1,2})$/;
        group = { year: 1, month: 3, dat: 4 }
    }


    this.group = group;
    this.check = function (str) {
        var d = this.toDate(str);
        if (d) {
            var tx = this.format(d);
            var dropPre0 = /\b0(\d)\b/g; //01和1要当成相等
            return tx.replace(dropPre0, '$1') == str.replace(dropPre0, '$1');
        }
        return false
    }
    this.toDate = function (str) {
        var m = reg.exec(str);
        if (m) {
            return initDate(m[group.year], m[group.month], m[group.day], m[group.hour], m[group.minute], m[group.second])
        }
        return null;
    }
    this.format = function (date) {
        return formatDate(date, format)
    }
}

function initDate(year, month, day, hour, minute, second) {
    var d = new Date();
    year = +year || d.getFullYear();
    if (year < 100) year += 2000;
    month = (+month || 1) - 1;
    day = +day || 1;
    hour = +hour || 0;
    minute = +minute || 0;
    second = +second || 0;
    return new Date(year, month, day, hour, minute, second);
}


module.exports = DateAny;
