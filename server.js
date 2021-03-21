const app = require('./app');

var server_port = process.env.PORT || process.env.YOUR_PORT || 5000;
console.log("Database_URL", process.env.DATABASE_URL);

app.listen(server_port, function() {
    console.log('Listening on port %d', server_port);
});