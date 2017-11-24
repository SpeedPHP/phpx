## phpx

Proxy for the none asynchronous http server, such as php server, then log the slow response and error to somewhere.

## Install

```
npm install phpx
```

start to listen: 

```
const phpx = require('phpx')

phpx('http://127.0.0.1:9000').listen(8000)
```

the `http://127.0.0.1:9000` is a http server to be watched.

and you can visit the `http://127.0.0.1:8000` to see the result.

## Test

```
npm test
```

## License

MIT