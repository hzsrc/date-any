var toDate = require('./toDate.js')

function DateAny(format) {
    if (!format) format = 'yyyy-MM-dd';
    var regStr = format.replace(/([\-\\\?\(\)\{\}\[\]\^\$\+\.\*])/g, '\\$1'); //特殊符号转义
    var group = {}, index = 1, reg;
    regStr = regStr.replace(/(d{1,4}|yyyy|yy|M{1,4}|HH?|mm?|ss?)/g, function (m) {
        switch (m) {
            case 'ddd':
            case 'dddd':
                index++
                return '(' + getDef(m) + ')'
            case 'd':
            case 'dd':
                group.day = index++;
                return '(\\d{1,2})'
            case 'yyyy':
            case 'yy':
                group.year = index++;
                return '(\\d{' + m.length + '})'
            case 'MMM':
            case 'MMMM':
                if (!group.month) group.month = index;
                index++
                return '(' + getDef(m) + ')'
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
    this.format = function (date0) {
        var date = toDate(date0, 1);
        if (isNaN(date)) return date0 || ''
        if (!format) format = 'yyyy-MM-dd';
        var year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
        var hour = date.getHours(), minute = date.getMinutes(), second = date.getSeconds();
        var str = format.replace('yyyy', year).replace('yy', year.toString().slice(2))
            .replace(/dddd?|MMMM?/g, function (m) {
                return getMsg(m, m[0] === 'M' ? month - 1 : date.getDay())
            });
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
}

function initDate(year, month, day, hour, minute, second) {
    var d = new Date();
    year = +year || d.getFullYear();
    if (year < 100) year += 2000;
    var monthN = +month
    if (isNaN(monthN) && month) {
        monthN = getMsgIndex('MMM', month) //9月或Sep
        if (monthN == -1) monthN = getMsgIndex('MMMM', month) //九月或September
    } else
        monthN = (monthN || 1) - 1
    day = +day || 1;
    hour = +hour || 0;
    minute = +minute || 0;
    second = +second || 0;
    return new Date(year, monthN, day, hour, minute, second);
}

function getDef(type) {
    var ret = DateAny.msgs[DateAny.lcid] || DateAny['1033']
    return ret[type]
}

function getMsgArr(type) {
    return (getDef(type) || '').split('|')
}

function getMsg(type, index) {
    var arr = getMsgArr(type);
    return arr && arr[index] || index
}

function getMsgIndex(type, msg) {
    var arr = getMsgArr(type)
    return arr.indexOf(msg)
}

DateAny.msgs = {
    2052: {
        ddd: '周日|周一|周二|周三|周四|周五|周六',
        dddd: '星期日|星期一|星期二|星期三|星期四|星期五|星期六',
        MMM: '1月|2月|3月|4月|5月|6月|7月|8月|9月|10月|11月|12月',
        MMMM: '一月|二月|三月|四月|五月|六月|七月|八月|九月|十月|十一月|十二月',
    },
    1033: {
        ddd: 'Mon|Tue|Wed|Thu|Fri|Sat|Sun',
        dddd: 'Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday',
        MMM: 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec',
        MMMM: 'January|February|March|April|May|June|July|August|September|October|November|December',
    },
}
DateAny.lcid = 2052

module.exports = DateAny;
