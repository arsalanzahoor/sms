exports.task = {
    name:          'dailyCron',
    description:   'dailyCron',
    frequency:     5000,
    queue:         'default',
    plugins:       [],
    pluginOptions: {},
  
    run: function(api, params, next){
        // your logic here');
        var moment = require('moment');
        if(moment().startOf('day')) {
            api.tasks.enqueue("dailyTask", params, "default", function(err, toRun){
        
                });
        }
        if(moment().startOf('week')) {
            api.tasks.enqueue("weeklyTask", params, "default", function(err, toRun){
        
                });
        }
        if(moment().startOf('month')) {
            api.tasks.enqueue("monthlyTask", params, "default", function(err, toRun){
        
                });
        }
        next();
    }
};