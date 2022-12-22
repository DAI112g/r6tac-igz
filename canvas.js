var drawing = false;
// 前回の座標を記録する（初期値：０）
var before_x = 0;
var before_y = 0;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//ボタンから色の情報ゲット
var linecolor = "rgb(0, 0, 255)";
function color_set(cnum){
  if (cnum == 0){
    var linecolor = 'white';
  }
  elseif (cnum == 1){
    var linecolor = 'black';
  }
  elseif (cnum == 2){
    var linecolor = 'red';
  }
  elseif (cnum == 3){
    var linecolor = 'blue';
  }
  elseif (cnum == 4){
    var linecolor = 'yellow';
  }
}
canvas.addEventListener('mousemove', draw_canvas);
// マウスをクリックしてる時
canvas.addEventListener('mousedown', function(e) {
  drawing = true;
  var rect = e.target.getBoundingClientRect();
  before_x = e.clientX - rect.left;
  before_y = e.clientY - rect.top;
});
// マウスをクリックしてない時
canvas.addEventListener('mouseup', function() {
  drawing = false;
});
// 描画の処理
function draw_canvas(e) {
// drawingがtrueじゃなかったら返す
if (!drawing){
  return
};
var rect = e.target.getBoundingClientRect();
var x = e.clientX - rect.left;
var y = e.clientY - rect.top;
var w = document.getElementById('width').value;

// 描画
ctx.lineCap = 'round';
ctx.strokeStyle = "white";
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(before_x, before_y);
ctx.lineTo(x, y);
ctx.stroke();
ctx.closePath();
// 描画最後の座標を前回の座標に代入する
before_x = x;
before_y = y;
}

// クリアボタンクリック時
// クリアボタンクリックした時にアラートを表示
function delete_canvas(){
ret = confirm('描画内容を削除します');
// アラートで「OK」を選んだ時
if (ret == true){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
}

var pen = document.getElementById('pencil');
var era = document.getElementById('eraser');
// 鉛筆と消しゴムの切り替え

function tool(btnNum){
// クリックされボタンが鉛筆だったら
if (btnNum == 1){
  ctx.globalCompositeOperation = 'source-over';
  pen.className = 'active';
  era.className = '';
}
// クリックされたボタンが消しゴムだったら
else if (btnNum == 2){
  ctx.globalCompositeOperation = 'destination-out';
  pen.className = '';
  era.className = 'active';
}
}
