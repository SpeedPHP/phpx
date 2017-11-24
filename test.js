'use strict'
const http = require('http')
const request = require('request')
const assert = require('assert')
const phpx = require('./phpx.js')

describe('Test', () => {
    let backend, proxy
    before(done => {
        backend = http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.write('hello world')
            res.end()
        }).listen(9000)
        proxy = phpx('http://127.0.0.1:9000').listen(8000)
        done()
    })
    it('Go throught to the direct server', done => {
        request('http://127.0.0.1:9000',  (error, response, body) => {
            assert.equal(response.statusCode, 200)
            assert.equal(body, 'hello world')
            done()
        })
    })
    it('Go by proxy and record', done => {
        request('http://127.0.0.1:8000',  (error, response, body) => {
            assert.equal(response.statusCode, 200)
            assert.equal(body, 'hello world')
            done()
        })
    })
    after(done => {
        backend.close()
        proxy.close()
        done()
    })
})