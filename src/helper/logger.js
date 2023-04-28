const fs = require('fs')
const { nowFormat, fullDateFormatJakarta } = require('./date')

const generateFolderLogs = (dynamicFolder, path) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()
  const folderPath = `./${dynamicFolder}/${path}/${year}/${month}/${date}/`
  const pathForDatabase = `${dynamicFolder}/${path}/${year}/${month}/${date}/`
  try {
    if (!fs.existsSync(folderPath)) {
      console.log('generated folder');
      fs.mkdirSync(folderPath, { recursive: true, mode: 755 })
      return {
        pathForDatabase,
        folderPath
      }
    }
    return {
      pathForDatabase,
      folderPath
    }
  } catch (error) {
    console.log(error)
    return error
  }
}

const writeLog = (message, fileName = `chat-log-${nowFormat()}.txt`, path = 'chat') => {
  try {
    const { folderPath } = generateFolderLogs('logs', path)
    const finalPath = `${__dirname}/../../${folderPath}/${fileName}`
    return fs.createWriteStream(finalPath, {
      flags: 'a',
      mode: 0o755
    }).write(`${fullDateFormatJakarta()} - ${message}\n`)
  } catch (error) {
    return error
  }
}

module.exports = {
  writeLog
}
