exports.task = {
  name:          'monthlyTask',
  description:   'monthlyTask',
  frequency:     0,
  queue:         'default',
  plugins:       [],
  pluginOptions: {},
  
  run: function(api, params, next){
    // your logic here');
    next();
  }
};