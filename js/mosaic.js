$(function(){
  var area = new Array(99);
  for (var i=0; i<=99; i++){
    area[i] = new Array(10);
    for(var j=0; j<=99; j++){
      area[i][j] = {x:50+5*j, y:50+5*i, u: Math.round(Math.random())*256};
      $('canvas').drawRect({
        fillStyle: 'rgb('+ Math.round(area[i][j].u) + ',' + Math.round(area[i][j].u) + ',' + Math.round(area[i][j].u) + ')',
        width : 5, height : 5, fromCenter : false,
        x: area[i][j].x, y: area[i][j].y
      });
    }
  }
});

