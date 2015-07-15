exports.action = {
  name:                   'sendEmail',
  description:            'sendEmail',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,

  inputs: {data: {required: true}},

  run: function(api, connection, next){
    // your logic here
    console.log('sendemail');
    api.sendEmail(connection.params.data, function(error, info){
    if(error){
        api.log('email error', 2, error);
    }else{
        console.log('Message sent: ', 1, info.response);
    }
});

    next(connection, true);
  }
};