let fs = require('fs')
let readline = require('readline')
let os = require('os')

function ReadWriteLine (readPath, writePath, cb) {
  let fsRead = fs.createReadStream(readPath)
  let fsWrite = fs.createWriteStream(writePath)
  let Readlines = readline.createInterface({
    input: fsRead // input可读流
    // output: writePath // 可写流
  })

  let index = 1 // 记录读取行数
  Readlines.on('line', function (line) {
    // console.log(`接收到：${line}`)
    let result = line.split(',')
    result = `('${result[1]}, ${result[2]}', '${result[3]}, ${result[4]}'),`
    if (index === 1) fsWrite.write(`INSERT INTO dat_reader_path (start_point, end_point) VALUES ${os.EOL}`)
    fsWrite.write(result + os.EOL) // os.EOL：换行符
    index ++
  })

  Readlines.on('close', function () {
    console.log('读取并且写入完毕！')
  })
}

ReadWriteLine ('./path.combine.lst', './readlog.log')