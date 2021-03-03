const app = require('./app');

var server_port = process.env.PORT || process.env.YOUR_PORT || 80;
var server_host = process.env.HOST || '127.0.0.1:5432';
console.log("Database_URL", process.env.DATABASE_URL);

app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
    console.log('Listening on host %d', server_host);
});