exports.task = {
  name:          'weeklyTask',
  description:   'weeklyTask',
  frequency:     0,
  queue:         'default',
  plugins:       [],
  pluginOptions: {},
  
  run: function(api, params, next){
    // your logic here');
    
    next();
  }
};