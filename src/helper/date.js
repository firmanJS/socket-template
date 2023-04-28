const moment = require('moment');

const LOG_FORMAT = 'DD-MM-YYYY';
const TZ = process?.env?.TZ ?? 'Asia/Jakarta'
const nowFormat = (formatDate = LOG_FORMAT, date = Date.now()) => {
  const format = moment(new Date(date).getTime()).format(formatDate);
  return format;
};
const fullDateFormatJakarta = (format = 'DD/MM/YYYY h:mm:ss', date = Date.now()) => moment(date).utc(TZ).format(format);
console.log(fullDateFormatJakarta());
module.exports = {
  nowFormat,
  fullDateFormatJakarta
};
