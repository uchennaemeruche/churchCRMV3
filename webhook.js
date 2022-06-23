let secret = process.env('WEBHOOK_SECRET')
let repo = '~/churchCRMV3/'

const http = require('http')
const crypto = require("crypto")
const exec = require('child_process').exec

const PM2_CMD = 'cd ~ && pm2 startOrRestart ecosystem.config.js'

http.createServer(function(req, res){
    req.on('data', function(chunk){
        let sig = 'sha1=' + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex')

        if(req.headers['x-hub-signature'] == sig){
            exec(`cd ${repo} && git pull && ${PM2_CMD}`, (error, stdout, stderr) =>{
                if(error){
                    console.error(`exec error: ${error}`);
                    return
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            })
        }
       
    })

    res.end()
}).listen(8080)

