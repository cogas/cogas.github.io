window.onload = function(){
    var point = {x:0,y:0};//座標
    var par = {x:4,y:6};//変化量
    var timer;//タイマー
    var delay = 1000;//タイマーを実行する間隔
    var loop = function(){
        point.x = (1 + point.x) % 60;
        point.y = (1 + point.y) % 60;
        draw(250+150*Math.sin(2*Math.PI/60*point.x),250-150*Math.cos(2*Math.PI/60*point.y));
        clearTimeout(timer);
        timer = setTimeout(loop,delay);
    }
    loop();
}

function draw(x,y){
        $('canvas')
        .clearCanvas()
        .drawLine({strokeStyle: '#000', strokeWidth:5, x1: 250, y1: 250, x2: x, y2: y})
        .drawEllipse({fillStyle: '#000', x:250, y:250, width: 20, height: 20});
        for (var i=1; i<=12; i++){
            $('canvas')
            .drawText({fillStyle: '#000', x: 250+200*Math.sin(2*Math.PI/12*i), y: 250-200*Math.cos(2*Math.PI/12*i), fontSize: 50, text: i});
        }
}

