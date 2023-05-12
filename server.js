const http = require('http');
const app = require('./backend/app');
//Setting Port on which Server Runs
const port = process.env.PORT || 3000
app.set('port', port)

//Server Creation
const server = http.createServer(app)
    //Server listening
server.listen(port)