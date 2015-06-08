exports.action = {
    name:                   'googletrans',
    description:            'googletrans',
    toDocument:             true,
    inputs: {
        data: {
            required: true
        },
        client:{
            required:true
        }
    },
    run: function(api, connection, next){
        console.log('GOOGLETRASNFER CONNECTION PARAMS DATA:',connection.params.data);
        api.googletrans(connection.params.data, function(error, info){
            if(error)
                console.log('ERROR GOOGLETRASNFER:',error);
            console.log('INFO GOOGLETRASNFER:',info);
        });
        next();
    }
};