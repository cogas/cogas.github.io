window.onload = function(){
    var can = document.getElementById("cvs");
    if(!can.getContext) return false;
    var ctx = can.getContext("2d");

    //options
    var point = {x:0,y:0};//���W
    var par = {x:4,y:6};//�ω���
    var timer;//�^�C�}�[
    var delay = 1;//�^�C�}�[�����s����Ԋu
    var width = can.width
    var height = can.height
    
    //�`�揈�����s���֐��Bloop()�֐��̒��ŌĂяo���B
    function draw(x,y){
//        ctx.clearRect(0,0,width,height);//��xcanvas���N���A
        ctx.fillRect(x,y,5,5);//point�̍��W�ɕ`��
    }
    
    //�J��Ԃ��`����s���֐��B
    var loop = function(){

        draw(Math.random()*width,Math.random()*height);
        clearTimeout(timer);
        timer = setTimeout(loop,delay);
    }
    loop();
}

