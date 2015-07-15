console.log('closing message server');
var initialize = function(api, options, next){

    //////////
    // INIT //
    //////////

    var type = "closingMsgServer";
    var attributes = {
        canChat: true,
        logConnections: true,
        logExits: true,
        sendWelcomeMessage: true,
        verbs: [
        "quit", 
        "exit",
        "paramAdd",
        "paramDelete",
        "paramView",
        "paramsView",
        "paramsDelete",
        "roomChange",
        "roomView",
        "listenToRoom",
        "silenceRoom",
        "detailsView",
        "say"
        ]
    };

    var server = new api.genericServer(type, options, attributes);

    //////////////////////
    // REQUIRED METHODS //
    //////////////////////

    server.start = function(next){
        
        var actionheroClient = require('actionhero-client');
        var myclient = new actionheroClient();

        myclient.connect({
            host: "localhost",
            port: "5000"
        }, function(){
            // get details about myself
            api.log('my details:',myclient.details);
        });
        myclient.on("welcome", function(msg){
            api.log("WELCOME: " , msg);
        });
        // join a chat room and talk
        myclient.roomAdd("defaultRoom", function(err){
            var a = 1;
            myclient.say("defaultRoom", "Hello from the actionheroClient");
            //    myclient.roomLeave("defaultRoom");
            myclient.on("say", function(msg){
                api.log(" > SAY: " + msg.message + " | from: " + msg.from);
                //                var res = JSON.parse(msg);
                //                api.log('res:',res);
                a++;
                api.redis.client.HSET("CLOSINGS","GUL"+a,msg.message, function(e, b){
                    
                    api.log('e,b:',e,b);
                });
            });
        });  
        
    };

    server.stop = function(next){
        next();
    };

    server.goodbye = function(connection, reason){
    
    };

    ////////////
    // EVENTS //
    ////////////

    server.on("connection", function(connection){
        
        });

    /////////////
    // HELPERS //
    /////////////

    next(server);
};

/////////////////////////////////////////////////////////////////////
// exports
exports.initialize = initialize;