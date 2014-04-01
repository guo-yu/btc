exports.list = function(map) {
  var list = [];
  Object.keys(map).forEach(function(name){
    map[name].name = name;
    list.push(map[name]);
  });
  return list;
};