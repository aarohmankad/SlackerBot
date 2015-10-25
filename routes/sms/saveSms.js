var
  $q = require('q');
  request = require('superagent'),
  TOKEN = 'xoxb-13180781681-ZxbeGfSGZJ5bBVmlFHOtlUYn';

function findChannel (channelName) {
  var deferred = $q.defer();

  console.log('finding channel', channelName);

  request
    .get('https://slack.com/api/channels.list?token=' + TOKEN + '&pretty=1')
    .end(function (err, data) {
      if (err) {
        return deferred.reject(err);
      };

      var channels = JSON.parse(data.text).channels;
      for (var i = channels.length - 1; i >= 0; i--) {
        console.log('going through ids', channels[i].name);
        if (channels[i].name === channelName) {
          console.log('returning id');
          return deferred.resolve(channels[i].id);
        }
      };
    });

  return deferred.promise;
}

module.exports = function(router) {
  router.post('/saveSms', function (req, res) {
    var wantedChannel = req.body.Body.split(/:/)[0];
    console.log('found wanted channel', wantedChannel);

    findChannel(wantedChannel)
      .then(function(channelId) {
        console.log('found channel id', channelId);
        // var url = 'https://slack.com/api/chat.postMessage?token=' + TOKEN + '&channel=' + channelId + '&text=' + encodeURIComponent(req.body.Body) + '&pretty=1';
        var url = 'https://slack.com/api/chat.postMessage?token=xoxp-9732185250-9732249015-13178236384-3cfc317adb&channel=C0D4UUZJ4&text=there%20is%20text!&pretty=1';
        console.log(url);
        request
          .post(url);
      });
  });
};