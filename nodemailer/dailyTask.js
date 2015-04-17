exports.task = {
    name:          'dailyTask',
    description:   'dailyTask',
    frequency:     0,
    queue:         'default',
    plugins:       [],
    pluginOptions: {},
  
    run: function(api, params, next){
        // your logic here');
        //DailySaleReport
        var dailysalereport = {
            url:''
        };
        var dailycombineclosing = {
            url:''
        }
        api.tasks.enqueueAt(moment().hour(6).unix(),"processLog", dailysalereport, "default", function(err, toRun){
            if(err) {
                //To Do Send Email For Task Failure.
                api.log(err,"daily sale report error");
            }
        });
        api.tasks.enqueueAt(moment().hour(6).unix(), "processLog", dailycombineclosing, "default", function(err, toRun) {
            if(err) {
                //To Do Send Email For Task Failure.
                api.log(err,"daily combine closing error");
            } 
        });
        next();
    }
};