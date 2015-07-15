exports.action = {
  name:                   'sync_gateway',
  description:            'sync_gateway',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,

  inputs: {username: {required: true}, password: {required: true}, channels: {required: true}},

  run: function(api, connection, next){
    // your logic here

    var request = require('request');
    var username = connection.params.username;
    var password = connection.params.password;
    var schannels = [];
    channels = connection.params.channels.split(',');
    for (var i in channels){
      var a = channels[i].trim();
      schannels.push(a);
    }

    url = 'http://localhost:4985/db/_user/'+username;

    var body = {"disabled":false, "admin_channels":schannels, "name":username, "password":password};

    request({url: url, method: 'PUT', body: JSON.stringify(body)}, function(a, b, c){
      api.log('response ',1, a, b.statusCode, c)
    });

    next(connection, true);
  }
};