var mongoose = require( 'mongoose' );
var readLine = require('readline');
var gracefulShutdown;
var dbURI = "mongodb+srv://Admin:mnzuipw62c@cluster0-7a9ru.gcp.mongodb.net/test?retryWrites=true&w=majority";

if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGODB_URI;
}

//var dbURI = 'mongodb://localhost/TODOlist';
//var dbURI = 'mongodb://heroku_f57f9l6s:618uh1sr9ku1o3t7h8gb1aao5m@ds037637.mlab.com:37637/heroku_dl5vc9fn';

mongoose.connect(dbURI);

/* Action messages */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

/* Generation SIGINT in Windows */
if (process.platform === "win32") {
  var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("SIGINT", function () {
    process.emit("SIGINT");
  });
}

/* Function Shutdown */
gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback;
    });
};

/* Listening to signals */
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemoon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.once('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

process.once('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

require('./project');