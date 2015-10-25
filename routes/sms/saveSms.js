var
  request = require('superagent'),
  TOKEN = 'xoxb-13180781681-ZxbeGfSGZJ5bBVmlFHOtlUYn';

function findChannel (channelName) {
  request
    .get('https://slack.com/api/channels.list?token=' + encodeURIComponent(TOKEN) + '&pretty=1')
    .end(function (err, data) {
      if (err) {
        console.log(err);
      };

      console.log(JSON.parse(data.text));
      // for (var i = data.channels.length - 1; i >= 0; i--) {
      //   if (data.channels[i].name !== channelName) {
      //     return;
      //   }

      //   return data.channels[i].id;
      // };
    });
}

module.exports = function(router) {
  // A POST request to /api/students will 
  // create a student based on request body
  router.post('/saveSms', function (req, res) {
    var wantedChannel = req.body.Body.split(/:/)[0];
    var channelId = findChannel(wantedChannel);

    request
      .post('https://slack.com/api/chat.postMessage')
      .send({
        token: TOKEN,
        channel: channelId,
        text: req.body.Body,
      });
  });
};