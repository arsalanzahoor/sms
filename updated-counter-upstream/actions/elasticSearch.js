exports.action = {
    name:                   'elasticSearch',
    description:            'elasticSearch',
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
        console.log('Elastic Search connection Params Data:',connection.params.data);
        api.elasticSearch(connection.params.data, function(error, info){
            if(error)
                console.log('ELASTICSEARCH ERROR:',error);
            console.log('ELASTICSEARCH INFO',info);
        });
        next();
    }
};