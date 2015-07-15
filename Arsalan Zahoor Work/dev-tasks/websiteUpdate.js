exports.task = {
  name:          'websiteUpdate',
  description:   'websiteUpdate',
  frequency:     0,
  queue:         'website',
  plugins:       [],
  pluginOptions: {},
  
  run: function(api, params, next){
    // your logic here');
    var task = params
    if(task.change_qty.search(/\+/i) != -1 || task.change_qty.search(/\-/) != -1 ) 
    var qty = eval('0' + task.change_qty );
      else 
          qty = task.change_qty;
    var i = 0;
    request({
        method: 'POST',
        url:'http://esajeecom.esajee.com/quickstart/index.php/links/index/stockupdate?sku='+encodeURIComponent(task.data.item_barcode)+'&qty='+ encodeURIComponent(qty)+'&processType='+ encodeURIComponent(task.processType)+'&itemName='+ encodeURIComponent(task.data.item_description)+'&retailPrice='+ encodeURIComponent(task.data.retail_price), 
        form:(task)
//        json:true
        
    }, function (error, response, body) {

      if(error || response.statusCode != 200){
        api.tasks.enqueueIn(1000 * 0.5 * 60, "websiteUpdate", params, 'website', function(err, toRun){
  // re enqueued!
        });
      }
      next();
        
    });


    
  }
};