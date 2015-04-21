exports.task = {
    name:          'parLevel',
    description:   'parLevel',
    frequency:     0,
    queue:         'default',
    plugins:       [],
    pluginOptions: {},
  
    run: function(api, params, next){
        // your logic here');
        console.log(params);
        var balance = JSON.parse(params.data.balance);
        var parlevel = JSON.parse(params.data.par_level);
        var packing = JSON.parse(task.data.packing);
        console.log(balance,parlevel,packing);
        if(packing > 0) {
            packing = packing;
        }
        else {
            packing = 1;
        }
        if( Math.ceil(balance/packing) <= parlevel && parlevel > 0 ) {
        if(balance <= parlevel) {
            var channel = params.channels[0];
            switch(channel) {
                case'main_kohsar':
                    url = 'kohsar.esajee.com';
                    break;
                case'main_gulberg':
                    url = 'gulberg.esajee.com';
                    break;
                case'main_defence':
                    url = 'dha.esajee.com';
                    break;
                case'main_warehouse':
                    url = 'warehouse.esajee.com';
                    break;
                case'main_dha_ware':
                    url = 'dhawarehouse.esajee.com';
                    break;
                default:
                    url = '192.168.1.40/v2_gulberg';
            }
            var data = {
                linkData : {
                    fkbarcodeid : params.data.itemid
                },
                url:'http://'+url+'/admin/api.php?method=processItem4Reorder&type=post&user_id=1888',
                method:'POST'
            };
        }
        api.tasks.enqueue("processLog", {
            data:data
        }, "default", function(err, toRun){
            if(err) {
                //To Do Send Email For Task Failure.
                api.log(err,"par level error");
            }
        });
        next();
    }
};