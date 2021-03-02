const app = require('./app');

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;

console.log("Database_URL", process.env.DATABASE_URL);

app.listen(server_port, function() {
    console.log('Listening on port %d', server_port);
});