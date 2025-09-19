var DateAny = require('./index.js')

function formatDate(date, format) {
    return new DateAny(format).format(date)
}

//用于兼容
Object.defineProperty(formatDate, 'weekDays', {
    set: function (v) {
        DateAny.msgs[2052].ddd = v
    }
})
module.exports = formatDate
