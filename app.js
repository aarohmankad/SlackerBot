var
  Slack = require('slack-client'),
  twilio = require('twilio')('AC9bcdf69e0e7df9756cc208aba249d2c9', '4a2c51d5d7cbb3b69ee3581321348acc');

var slack = new Slack('xoxb-13180781681-ZxbeGfSGZJ5bBVmlFHOtlUYn', true, true);

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
