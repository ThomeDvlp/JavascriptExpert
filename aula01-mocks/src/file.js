const { readFile } = require('fs/promises');
const { join } = require('path');
const { error } = require('./constants')
const DEFAULT_OPTION = {
    maxLines:3,
    fields: ["id", "name", "profession", "age"]
}
class File {
    static async csvToJson(filePath) {
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content)
        if(!validation.valid) throw new Error(validation.error)

        return content;
    }

    static async getFileContent(filePath) {
        return (await readFile(filePath)).toString("utf8")
    }
    static isValid(csvToString, options = DEFAULT_OPTION ) {
        const [header, ...fileWithoutHader] = csvToString.split("\n")
        const isHeaderValid = header === options.fields.join(',')
        if(!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESASGE,
                valid: false
            }
        }

        const isContentlengthAccepted = (
            fileWithoutHader.length > 0 &&
            fileWithoutHader.length <= options.maxLines
        )
        if(!isContentlengthAccepted) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        return { valid: true }
    }

}

module.exports = File