require('dotenv').config();

const serviceUrl = process?.env?.SERVICE_URL
const axios = require('axios')
const { writeLog } = require('./logger')
const { nowFormat } = require('./date')

const request = async (url, method, data = {}, config = {}) => {
  const fileName = `request-to-service-${nowFormat()}.txt`
  try {
    const response = await axios({
      method,
      url: `${serviceUrl}${url}`,
      data,
      ...config
    })
    const message = `request success from url ${serviceUrl}${url} \nheaders ${JSON.stringify(response?.headers)}\nresponse ${JSON.stringify(response?.data)}`
    writeLog(message, fileName, 'request')
    return response
  } catch (error) {
    const message = `request errror from url \nresponse ${JSON.stringify(error)}\noriginal error ${error}`
    writeLog(message, fileName, 'request')
    return error
  }
}

module.exports = {
  request
}
