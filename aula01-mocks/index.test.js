const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')
;
(async () => {
{  
  const filePath = './mocks/emptyFile-invalid.csv'
  const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
  const result = File.csvToJson(filePath)
  await rejects(result, rejection)
}
{
  const filePath = './mocks/fourItems-invalid.csv'
  const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
  const result = File.csvToJson(filePath)
  await rejects(result, rejection)
}
{
  const filePath = './mocks/threeItems-invalid.csv' 
  const result = await File.csvToJson(filePath)
  const expected = [
      {
        "name": "Thome",
        "id": 123,
        "profession": "Developer",
        "birthDay": 1978
      },
      {
      "id": 321,
        "name": "Xuxu",
        "profession": "Student",
        "birthDay": 1998
      },
      {
        "name": "Samuel",
        "id": 543,
        "profession": "Student",
        "birthDay": 1999
      }
    ]
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()