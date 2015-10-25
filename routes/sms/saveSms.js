var
  $q = require('q');
  request = require('superagent'),
  TOKEN = 'xoxb-13180781681-ZxbeGfSGZJ5bBVmlFHOtlUYn';

function findChannel (channelName) {
  var deferred = $q.defer();

  request
    .get('https://slack.com/api/channels.list?token=' + encodeURIComponent(TOKEN) + '&pretty=1')
    .end(function (err, data) {
      if (err) {
        return deferred.reject(err);
      };

      var channels = JSON.parse(data.text).channels;
      for (var i = channels.length - 1; i >= 0; i--) {
        if (channels[i].name !== channelName) {
          return;
        }

        console.log('returning id');
        return deferred.resolve(channels[i].id);
      };
    });

  return deferred.promise;
}

module.exports = function(router) {
  // A POST request to /api/students will 
  // create a student based on request body
  router.post('/saveSms', function (req, res) {
    var wantedChannel = req.body.Body.split(/:/)[0];

    findChannel(wantedChannel)
      .then(function(channelId) {
        request
          .post('https://slack.com/api/chat.postMessage')
          .send({
            token: TOKEN,
            channel: channelId,
            text: req.body.Body,
          });
      });
  });
};