var
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  Slack = require('slack-client'),
  slack = new Slack('xoxb-13180781681-ZxbeGfSGZJ5bBVmlFHOtlUYn', true, true),
  twilio = require('twilio')('AC9bcdf69e0e7df9756cc208aba249d2c9', '4a2c51d5d7cbb3b69ee3581321348acc'),
  port = process.env.PORT || 8000;

// Allow us to return json to client
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

// Add headers for http requests
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,origin,content-type,accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

slack.on('message', function (message) {
  var
    sender = message._client.users[message.user].name,
    channel = message._client.channels[message.channel].name,
    message = message.text;

  twilio.sendMessage({
    to: '+17604987135',
    from: '+17608915709',
    body: sender + ' (' + channel + ') - ' + message,
  }, function (err, data) {
    if (err) {
      console.log(err);
    }

    console.log(data.body);
  });
});

slack.login();

// Instantiate all our routes
require('./routes/index')(app);

// Start server
app.listen(port);
console.log('Magic happens on port:', port);