var DateAny = require('../index.js')
var date = new Date(2020, 11, 31, 13, 56, 57)
var date1 = new Date(2020, 1, 3, 3, 4, 5)

testFormat(date, 'yyyy-MM-dd HH:mm:ss', '2020-12-31 13:56:57')
testFormat(date1, 'yyyy-M-d H:mm:ss', '2020-2-3 3:04:05')
testFormat(date1, 'dd/M/yyyy H:mm:ss', '03/2/2020 3:04:05')
testFormat(date1, 'yy年的M月dd日 H点mm分', '20年的2月03日 3点04分')
testFormat(date1, 'MMMM MMM dddd ddd', '二月 2月 星期一 周一')

testCheck('yyyy-MM-dd HH:mm:ss', '2020-12-31 13:56:57')
testCheck('yyyy-M-d H:mm:ss', '2020-2-3 3:04:05')
testCheck('dd/M/yyyy H:mm:ss', '03/2/2020 3:04:05')
testCheck('yy年的M月dd日 H点mm分', '20年的2月03日 3点04分')

testParse(date, null, '2020-12-31')
testParse(date, 'yyyy-MM-dd HH:mm:ss', '2020-12-31 13:56:57')
testParse(date1, 'yyyy-M-d H:mm:ss', '2020-2-3 3:04:05')
testParse(date1, 'dd/M/yyyy H:mm:ss', '03/2/2020 3:04:05')
testParse(date1, 'yy年的M月dd日 H点mm分', '20年的2月03日 3点04分')
testParse(date1, 'MMMM MMM dddd ddd yyyy/dd', '二月 2月 星期一 周一 2020/03')


function testFormat(date, format, result) {
    var test = new DateAny(format).format(date)
    if (test !== result)
        console.error('Format fail: ' + test + '\t' + format + '\t != \t' + result)
}

function testCheck(format, dateStr) {
    var isMatch = new DateAny(format).check(dateStr)
    if (!isMatch)
        console.error(dateStr + '\t not match \t' + format)
}

function testParse(result, format, dateStr) {
    var test = new DateAny(format).toDate(dateStr)

    var strTest = new DateAny(format).format(test)
    var strRet = new DateAny(format).format(result)
    if (strRet !== strTest)
        console.error('Parse fail: ' + strTest + '\t != \t' + strRet + '\n\t' + format)
}
