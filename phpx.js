'use strict'
const http = require('http')
const httpProxy = require('http-proxy')
module.exports = (_target) => {
    const proxy = httpProxy.createProxyServer();
    const error = {}
    const slow = {}

    proxy.on('error', (err, req) => {
        let url = req.headers.host + req.url
        if(error[url] == undefined){
            error[url] = 1
        }else{
            error[url] += 1
        }
    })

    return http.createServer( (req, res) => {
        let timeout = setTimeout(() => {
            let url = req.headers.host + req.url
            if(slow[url] == undefined){
                slow[url] = 1
            }else{
                slow[url] += 1
            }
        }, 2000)
        proxy.web(req, res, {
            target: _target
        })
        req.connection.on('close', () => {
            clearTimeout(timeout)
        })
    })
}

